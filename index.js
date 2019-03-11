const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
const https = require('https');
const aws = require('aws-sdk');
const routes = require('./Routes/routes');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

//apply middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/', routes);

//TODO move error handling to different file
//TODO correct HTML statuses
//https://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
  if (err.message === 'access denied') {
    res.status(403);
    res.json({ error: err.message });
  }
 
  //next(err);
  res.status(500);
  res.json({ error: err.message});
});

var mongoose = require('mongoose');

//Set up default mongoose connection
mongoose.connect(process.env.MONGO_URI, {
	useCreateIndex: true,
	useNewUrlParser: true,
});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



aws.config.update({
    // Your SECRET ACCESS KEY from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // Not working key, Your ACCESS KEY ID from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION // region of your bucket
});



//TODO get rid of http server once we start making https calls on the frontend
const httpServer = app.listen(process.env.PORT, () => {
  var host = httpServer.address().address
  var port = httpServer.address().port

  console.log(`Example app listening at http://${host}:${port}`);
});

/*
const httpsServer = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(process.env.SECURE_PORT, () => {
  var host = httpsServer.address().address
  var port = httpsServer.address().port

  console.log("Example app listening at https://%s:%s", host, port)
});
*/