const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api.js');
const publicRoutes = require('./routes/public');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();

var cors = require('cors');

const requireAuth = (req, res, next) => {
	try {
		console.log("hello",JSON.stringify(req.cookies));
		const token = req.cookies.jwt;
		// check json web token exists & is verified
		if (token) {
			jwt.verify(token, 'secret code', (err, decodedToken) => {
				if (err) {
					console.log(err.message);
					res.status(400).json({ error: 'please login' });
				} else {
					console.log(decodedToken);
					next();
				}
			});
		} else {
			res.status(400).json({ error: 'please login' });
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: 'please login' });
	}
};

mongoose.connect('mongodb+srv://sujeeth:vsaisujeeth@cluster0.84bzl.mongodb.net/mydb', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
	origin : 'http://localhost:3000' ,
	credentials: true,
  })
);  

// app.use(function(req, res, next) {  
// 	res.header('Access-Control-Allow-Origin', req.headers.origin);
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
// });  

app.use('/api', requireAuth, apiRoutes);
app.use(publicRoutes);

app.listen(process.env.port || 4000, function() {
	console.log('now listening for requests, port:', process.env.port || 4000);
});
