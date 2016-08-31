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


//GET request from user api
var getUsersFromApi = function(){
    var apiUrl = "http://api.randomuser.me/?inc=name,picture"
    request({
    uri: apiUrl,
    method: 'GET'

    }, function (error, response, body) {
    var result = JSON.parse(body).results[0]
    console.log(result);
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
app.post('/allPeople/:thief', function(req, res, next) {
    steelPeople.mycoll.aggregate(
   { $sample: { size: 1 } }
)
  User.findById(req.params.id, function(err, beer) {
    if (err) { return (err); }

    user.reviews.push(review);

    beer.save(function (err, beer) {
      if (err) { return next(err); }
    
      res.json(review);
    });
  });
});

app.listen(1337) 