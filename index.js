const express = require('express')
const app = express();
const routes = require('./Routes/routes');
const bb = require('express-busboy');
bb.extend(app, {
	upload: true
});

app.use(express.static('public'));

//Routes
app.use('/', routes);

var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/store';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var server = app.listen(8000, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});