const { Router } = require('express');
const router = Router();

const User = require("../models/users.js");
const jwt = require('jsonwebtoken');
const Comments = require('../models/comments.js');

var multer = require('multer')
var nodemailer = require('nodemailer');


var ncrypt = require('ncrypt-js');
var { encrypt, decrypt } = new ncrypt('farewell');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('users validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });
}
return errors;
}


// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secret code', {
    expiresIn: maxAge
  })
};

router.get('/verify', async (req,res)=> {
  try {
    var email = req.query.tok
    email = decrypt(email);
    var myquery = { 'email': email };
    var newvalues = { $set: {verified: 1} };
    await User.updateOne(myquery, newvalues);
    res.status(200).send("Email verified")
  } catch{
     res.send("ERROR. Try again later or contact administrator")
  }
});
router.post('/signup', async (req, res) => {
  

    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
           cb(null, '../public/photos')
      },
      filename: function (req, file, cb) {
           cb(null, Date.now() + '-' +file.originalname )
      }
    })
    var upload = multer({ storage: storage }).single('file')
    upload(req, res, async (err)=>{
          if (err instanceof multer.MulterError) {
              return res.status(500).json(err)
          } else if (err) {
              return res.status(500).json(err)
          }
          var { name, email, password,branch,batch,college,size } = req.body; 
          try{
            const user1 = {"length" :0}//await User.find({email});
            console.log(user1);
            if(user1.length!==0){
              res.status(400).json({"error": "Email already exists"})
            }
            else{
              var imageURL = req.file.filename;
              var verified =  0;
              console.log(imageURL)
              const user = await User.create({name, email, password,branch,batch,college,size,imageURL,verified}); 

              var tok =   encrypt(email)
              var link = "http://localhost:4000/verify?tok="+tok
              console.log(link)
              
              var mailOptions = {
                from: 'iitpfarewell@gmail.com',
                to: email,
                subject: 'Verification for farewell',
                html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
              };

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  res.status(400).json({"error":"Mail can't be sent"})
                }
              }); 
              res.status(201).json({ user: user._id,'message': 'Verification email Sent. Please verify your email.'});

            }
          } catch(err) {
              const errors = handleErrors(err);   
              res.status(400).json({errors}); 
          }
    })  
});

// get a list of comments of user from the db
router.get('/get_comments', function(req, res){
  let to = req.query.to;
  Comments.find({'to': to}).then(function(comments){
     res.send({comments});
  }).catch(err=>res.status(400).json({'error': err.message}));
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      console.log(user)
      if(user.verified == 0) res.status(200).json({"error":"Verify your email"})
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id, 'message': 'logged in' });
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  }
);

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({"message": "logged out"})
  }
);

// get a list of users from the db
router.get('/users', function(req, res){
  let batch =req.query.batch;
  let college =req.query.college;

  User.find({batch, college}).then(function(users){
     res.send({users});
  }).catch(err=>res.status(400).json({'error': err.message}));
});

router.get('/users/:id', function(req, res){
   let id = req.params.id;
  // find document with id 
  User.findById(id, function (err, docs) { 
      if (err){ 
          console.log(err.message); 
          res.status(400).json({'error':'error in fetching'})
      } 
      else{ 
          if (docs==null){ 
              res.status(400).json({'error':'Id not found'})
              return;
          } 
          console.log("Result:", docs); 
          res.status(200).json(docs)
      } 
  }); 
});

module.exports = router;