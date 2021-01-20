const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Comments = require('../models/comments.js');
const User = require("../models/users.js");

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


// get a list of comments of user from the db
router.get('/my_comments', function(req, res){
    let author = getUserFromToken(req);
    Comments.find({'from': author}).then(function(comments){
       res.send({comments});
    }).catch(err=>res.status(400).json({'error': err.message}));
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
                res.status(400).json({'error':'You do not have access to delete document created by other users'})
            }

        } 
    }); 

});

module.exports = router;