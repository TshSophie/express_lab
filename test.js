var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var url = "mongodb+srv://root:root@lab10-iwamz.mongodb.net/test?retryWrites=true";

PORT = process.env.PORT || 5000 

srv = app.listen(PORT)

 