const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api.js');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();


const requireAuth = (req, res, next) => {
    try {
        console.log(req.cookies)
        const token = req.cookies.jwt
        // check json web token exists & is verified
        if (token) {
            jwt.verify(token, 'secret code', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(400).json({"error":"please login"}); 
            } else {
                console.log(decodedToken);
                next();
            }
            });
        } else {
            res.status(400).json({"error":"please login"}); 
        }
    } catch(err) {
        console.log(err)
        res.status(400).json({"error":"please login"}); 
    }
  };

  
mongoose.connect('mongodb+srv://sujeeth:vsaisujeeth@cluster0.84bzl.mongodb.net/mydb',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api',requireAuth,apiRoutes);
app.use(authRoutes);

app.listen(process.env.port || 4000,function(){
    console.log("now listening for requests");
});