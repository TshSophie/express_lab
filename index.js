/**
 * 
 * @authors Sophie
 * @date    2019-04-30 17:16:30 
 */
var express = require('express');
var bodyParser = require("body-parser");
var multer = require('multer'); 
var MongoClient = require("mongodb").MongoClient;
var app = express();


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data


const CONNECT_URL = "mongodb+srv://root:root@lab10-iwamz.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "lab10db";

app.use(bodyParser.urlencoded({ extended: false }));
PORT = process.env.PORT || 5000 
srv = app.listen(PORT)

console.log("Server is listening on port: " + PORT)

app.get('/', function (req, res) {

   res.send('Hello World! <br/> This is the root our service!');
})
 

app.post("/notes",(request,response)=>{
   MongoClient.connect(CONNECT_URL, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db(DATABASE_NAME);
      var myobj = request.body
      dbo.collection("lab10db").insertOne(myobj, function(err, res) {
         if (err){
            return response.status(500).send(err)
         }
         console.log("插入成功");
         db.close();
         response.send(res.result)
      });
   });   
});


app.get("/notes",(request,response)=>{
   MongoClient.connect(CONNECT_URL, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db(DATABASE_NAME);
      dbo.collection("lab10db"). find({}).toArray(function(err, result) { // 返回集合中所有数据
          if (err) throw err;
          console.log(result);
          db.close();
          response.send(result)
      });
   });   
});


app.put("/notes/:id",(request,response)=>{
   
   console.log(request.params.id)
      
   MongoClient.connect(CONNECT_URL,{useNewUrlParser:true},(error,client)=>{
      if(error){
         response.send(error);
         throw error;
      }
     
      databse = client.db(DATABASE_NAME);
      collection = databse.collection("lab10db");

      collection.find({}).toArray((error,result)=>{

         if(error){            
            return response.status(500).send(error)
         }         

         var numberID = parseInt(request.params.id);

         console.log(result[numberID])
         if(numberID >= result.length)
            response.send("Not enough elements in database")
         else{
            collection.update({"_id":result[numberID]._id},{$set:request.body})
            response.send("Updated!")
         }
      });
   });
});


app.delete("/notes/:id",(request,response)=>{
   
   console.log(request.params.id)
      
   MongoClient.connect(CONNECT_URL,{useNewUrlParser:true},(error,client)=>{
      if(error){
         response.send(error);
         throw error;
      }
     
      databse = client.db(DATABASE_NAME);
      collection = databse.collection("lab10db");
      collection.find({}).toArray((error,result)=>{
         if(error){            
            return response.status(500).send(error)
         }
         
         var numberID = parseInt(request.params.id);

         if(numberID>=result.length)
            response.send("Not enough elements in database")
         else{

            collection.remove({"_id":result[numberID]._id},(err,result)=>{
               if(err){
                  response.send(result[numberID]);
                  throw err;                  
               }            
               response.send("user deleted!")
            })
         }
      });
   });
});

