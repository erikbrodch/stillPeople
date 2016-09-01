var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request')

mongoose.connect('mongodb://localhost/steelPeople');

var User = require("./modules/personModule");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', function(req, res){
  res.sendFile(__dirname + "index.html");
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


//GET request from user api
var getUsersFromApi = function(){
    var apiUrl = "http://api.randomuser.me/?inc=name,picture"
    request({
    uri: apiUrl,
    method: 'GET'

    }, function (error, response, body) {

    var result = JSON.parse(body).results[0]
    var person = new User({name: result.name.first +" " + result.name.last, picture: result.picture.thumbnail});
    person.save(function(err, person) {
    if (err) { return (err); }
    });
    }
    )
};
//make a get request every 10 seconds

setInterval(getUsersFromApi, 10000)

//get request to get all people in db
app.get('/allPeople', function (req, res) {
  User.find(function (error, steelPeople) {
    res.send(steelPeople);
  });
});

//let others still from you
app.get('/allPeople/:thief', function(req, res, next) {
 User.find({}, function(err, users) {
   var len = users.length;
   var person = users[Math.floor(Math.random() * len)];
   console.log("here with person", person)
    if(person.stolenBy === "UD") {
      res.json(person);
      person.stolenBy = req.params.thief
      console.log("here with person and stole", person)
      person.save()
    } 
   }); 
});

//still from others
app.post('/stillPeople', function (req, res, next) {
          console.log(req.body.url);
          var stillUrl = req.body.url + "/allPeople/Arik";
          request({
          uri: stillUrl,
          method: 'GET'

          }, function (error, response, body) {
            console.log(body);
          var response = JSON.parse(body)
          var stolenPerson = new User({name: response.name, picture: response, stolenFrom: response.origin});
          stolenPerson.save(function(err, person) {
          if (err) { return (err); }
          });
          }
          )
        });



app.listen(1337) 