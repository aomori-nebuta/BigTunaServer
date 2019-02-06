const express = require('express');
const app = express();

app.use("/users", require("./users"));
app.use("/posts", require("./posts"));

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Connected!'});
});

module.exports = app;