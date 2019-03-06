const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
const routes = require('./Routes/routes');
const bb = require('express-busboy');
bb.extend(app, {
	upload: true
});

app.use(express.static('public'));

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
var mongoDbUri = 'mongodb://127.0.0.1/store';
mongoose.connect(mongoDbUri, {
	useCreateIndex: true,
	useNewUrlParser: true,
});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//TODO get rid of http server once we start making https calls on the frontend
const httpServer = app.listen(8000, () => {
  var host = httpServer.address().address
  var port = httpServer.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});

const httpsServer = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(8080, () => {
  var host = httpsServer.address().address
  var port = httpsServer.address().port

  console.log("Example app listening at https://%s:%s", host, port)
});