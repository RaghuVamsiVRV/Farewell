const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api.js');
const publicRoutes = require('./routes/public');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const dotenv = require('dotenv')
var cors = require('cors');

dotenv.config();
const requireAuth = (req, res, next) => {
	try {
		console.log("hello",JSON.stringify(req.cookies));
		const token = req.cookies.jwt;
		// check json web token exists & is verified
		console.log(token);
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


var url = process.env.DB_URL

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(express.urlencoded({
	extended: true
  }))

app.use(cookieParser());

app.use(cors({
	origin : ['http://farewell-iitp.herokuapp.com/'] ,
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
