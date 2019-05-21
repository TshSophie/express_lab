/**
 * 
 * @authors Sophie
 * @date    2019-04-30 17:16:30 
 */
var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var app = express();
const CONNECT_URL = "mongodb://localhost:27017/runoob";
const DATABASE_NAME = "name";
PORT = process.env.PORT || 5000 

srv = app.listen(PORT)

console.log("Server is listening on port: " + PORT)

app.get('/', function (req, res) {

   res.send('Hello World! <br/> This is the root our service!');
})
 

app.post("/notes",(request,response)=>{

 	MongoClient.connect(CONNECT_URL,{useNewUrlParser:true},(error,client)=>{
       if(error){
          response.send(error);
          throw error;
       }
       databse = client.db(DATABASE_NAME);
       collection = databse.collection("Notes");
       collection.insert(request.body,(error,result)=>{
          if(error){
             return response.status(500).send(error)
          }
          response.send(result.result)
       });
    });
});

app.get("/notes",(request,response)=>{

   MongoClient.connect(CONNECT_URL,{useNewUrlParser:true},(error,client)=>{
      if(error){
         response.send(error);
         throw error;
      }
      databse = client.db(DATABASE_NAME);
      collection = databse.collection("Notes");
      
      collection.find({}).toArray((error,result)=>{
         if(error){
            return response.status(500).send(error)
         }
         response.send(result.result)
      })
   });
});

app.put("/notes/:id",(request,response)=>{

   MongoClient.connect(CONNECT_URL,{useNewUrlParser:true},(error,client)=>{
      if(error){
         response.send(error);
         throw error;
      }
      databse = client.db(DATABASE_NAME);
      collection = databse.collection("Notes");
      collection.find({}).toArray((error,result)=>{
         if(error){
            response.send(result[numberID]._id);
            return response.status(500).send(error)
         }
         
         var numberID = parseInt(request.param.id);
         if(numberID>=result.length)
            response.send("Not enough elements in database")
         else{
            collection.update({"_id":result[numberID]._id},{$set:{"body":request.body.body}})
            response.send("Updated!")
         }
      });
   });
});


app.delete("/notes/:id",(request,response)=>{

   MongoClient.connect(CONNECT_URL,{useNewUrlParser:true},(error,client)=>{
      if(error){
         response.send(error);
         throw error;
      }
      databse = client.db(DATABASE_NAME);
      collection = databse.collection("Notes");
      collection.find({}).toArray((error,result)=>{
         if(error){            
            return response.status(500).send(error)
         }
         
         var numberID = parseInt(request.param.id);

         if(numberID>=result.length)
            response.send("Not enough elements in database")
         else{

            collection.remove({"_id":result[numberID._id]._id},(err,result)=>{
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

