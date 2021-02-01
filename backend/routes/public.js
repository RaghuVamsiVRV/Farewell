const { Router } = require('express');
const router = Router();

const User = require("../models/users.js");
const jwt = require('jsonwebtoken');

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

router.post('/signup', async (req, res) => {
    const { name, email, password,branch,batch,college, imageURL } = req.body;
    try{
      const user1 = await User.find({email});
      console.log(user1);
      if(user1.length!==0){
        res.status(400).json({"error": "Email already exists"})
      }
      else{
        const user = await User.create({name, email, password,branch,batch,college,imageURL}); 
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id,'message': 'Signed up and logged in'});
      }
    } catch(err) {
        const errors = handleErrors(err);   
        res.status(400).json({errors}); 
    }
  }
);

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
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