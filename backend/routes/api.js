const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Comments = require('../models/comments.js');
const Users = require('../models/users.js');

var multer = require('multer')
const bcrypt = require('bcrypt');
const fs = require('fs');

const resizer = require('node-image-resizer');
const setup = { 
  all: {
    path: './public/photos/',
    quality: 60
  },
  versions: [{
      width: 1024,
      height: 768
    }]
};



  
// get the user id from JWT token
const getUserFromToken = (req)=>{
    const token = req.cookies.jwt;
    let id ;
    if (token) {
        jwt.verify(token, 'secret code', (err, decodedToken) => {
            id = decodedToken.id;
        });
    } 
    console.log("id",id);
    return id;
}

// get a list of comments of user from the db
router.get('/my_comments', function(req, res){
    let author = getUserFromToken(req);
    Comments.find({'from': author}).then(function(comments){
       res.send({comments});
    }).catch(err=>res.status(400).json({'error': err.message}));
});

router.post('/edit',async function(req,res){
    let userID = getUserFromToken(req);
    
    
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
             cb(null, './public/photos')
        },
        filename: function (req, file, cb) {
             cb(null, Date.now() + '-' +file.originalname )
        }
      })
      var upload = multer({ storage: storage }).single('file')
      upload(req, res, async (err)=>{
        console.log(req.body)
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            var {email} = req.body; 
            for(let key in req.body)
            {
                if(!req.body[key] || req.body[key]==''|| req.body[key]==' ')
                {
                    delete req.body[key]
                }
            }

            if(email)
            {
                const user1 = await Users.find({email});
                console.log(user1);
                if(user1.length!==0 && user1[0]._id!=userID){
                  res.status(400).json({"error": "Email already exists in other profile"})
                }
            }
            try{
                if(req.file) {
                    // console.log(req.file)
                    const user = await Users.findById(userID);
                    fs.unlink("./public/photos/" + user.imageURL,function(err) {
                        if(err) {
                            console.info("Error removing file");
                        }
                    });
                    req.body.imageURL = req.file.filename;
                    imageURL = req.file.filename;
                    resizer("./public/photos/"+imageURL, setup);
                }
                if(req.body.password && req.body.password!='')
                {
                    const salt = await bcrypt.genSalt();
                    req.body.password= await bcrypt.hash(req.body.password, salt);
                    
                }
                Users.findByIdAndUpdate(userID, req.body, function (err, docs) { 
                        if (err){ 
                            throw err
                        } 
                        else{ 
                            res.status(201).json({'message': 'updated'});
                        } 
                }); 
              
            } catch(err) {
                res.status(400).json({"err":err.message}); 
            }
      })  
});
// add a new comments to the db
router.post('/add_comment', function(req, res){
    let from = getUserFromToken(req);
    let obj= req.body;
    obj.from = from;
    obj.time = new Date();
    Comments.create(obj).then(function(comments){
        res.send(comments);
    }).catch(err=>res.status(400).json({'error': err.message}));
});

// update a comments in the db
router.put('/edit_comment/:id', function(req, res){
    
    let from = getUserFromToken(req);
    let id = req.params.id;
    let obj= req.body;
    obj.from = from;
    obj.time = new Date();
    // find document with id 
    Comments.findById(id, function (err, docs) { 
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
            
            // if logged user matches with the author then update
            if(docs.from == from){
                Comments.findByIdAndUpdate({_id: req.params.id, }, req.body).then(function(){
                    Comments.findOne({_id: req.params.id}).then(function(comments){
                        res.send(comments);
                    });
                }).catch(err=>res.status(400).json({'error': err.message}));
            }
            else{
                res.status(400).json({'error':'You do not have access to update document created by other users'})
            }

        } 
    }); 
});

// delete a comments from the db
router.delete('/delete_comment/:id', function(req, res){
    let author = getUserFromToken(req);
    let id = req.params.id;

    // find document with id 
    Comments.findById(id, function (err, docs) { 
        if (err){ 
            console.log(err); 
            res.status(400).json({'error':err.message})
        } 
        else{ 
            console.log("Result : ", docs); 
            if (docs==null){ 
                res.status(400).json({'error':'Id not found'})
                return;
            } 

            // if logged user matches with the author then delete
            if(docs.from == author){
                Comments.findByIdAndRemove({_id: req.params.id}).then(function(comments){
                    res.send(comments);
                }).catch(err=>res.status(400).json({'error': err.message}))
            }
            else{
                res.status(400).json({'error':'You do not have access to delete comments created by other users'})
            }

        } 
    }); 

});

module.exports = router;