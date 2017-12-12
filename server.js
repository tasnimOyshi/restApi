var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var fs = require("fs");
var mongojs = require('mongojs');
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://iot.eclipse.org')


var db = mongojs("mongodb://badhon:123456@ds255265.mlab.com:55265/badhon",['alu']);
// app.get('/', (req, res)=> {
//   res.send("Hi.... !!");
// });

app.get('/Temp', (req, res)=> {
  res.send("Hi Temp .... !!");
});

app.get('/Light', (req, res)=> {
  res.send("Hi Light.... !!");
});

app.get('/Sound', (req, res)=> {
  res.send("Hi Sound.... !!");
});

  app.get('/', (req, res)=> {
    db.alu.find((err,docs)=>{
      res.send(docs) ;
    })
  });
  app.post('/post', function(req, res){
    db.alu.save(req.body);
    console.log("post data"); 
    res.json(req.body);
    })

    app.listen(3000,()=>{
      console.log("listening to 3000 port");
    });

    // client.on('connect', function () {
    //   client.subscribe('alu')
    //   client.publish('alu', 'Hello mqtt')
    // })
     
    // client.on('message', function (alu, message) {
    //   // message is Buffer
    //   console.log(message.toString())
    //   client.end()
    // })


    client.on('connect', function () {
      client.subscribe("alu")
      // client.publish('shimul-iot', 'Conversation started with Shimul-Server')
  })
  
  client.on("message", function (topic, message) {
      var data = JSON.parse(message);
      db.alu.save(data);
  })
 