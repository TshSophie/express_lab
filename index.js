/**
 * 
 * @authors Sophie
 * @date    2019-04-30 17:16:30 
 */
var express = require('express');
var app = express();
 
PORT = process.env.PORT || 5000 

srv = app.listen(PORT)

console.log("Server is listening on port: " + PORT)

app.get('/', function (req, res) {

   res.send('Hello World! <br/> This is the root our service!');
})
 

