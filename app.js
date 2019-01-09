const express = require('express');
const app = express();
const db = require('./database.js');
const bodyParser = require('body-parser');
const session  = require('express-session');
const port = 8080;

app.use(session({
  secret: 'password',
  resave: true,
  saveUninitialized: false
}));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.get('/', (req, res) => res.send({"code":400, "success":"Server running"}));
// if you want to view a hmtl file
// app.get('/page', (req, res) => res.sendFile(__dirname + '/views/page.html'));

//GET requests
app.get('/BMI', function(req, res) {
  res.render('BMI.ejs');
});

app.get('/calorie_counter', function(req, res) {
  res.render('calorie_counter.ejs');
});

app.get('/', function(req, res) {
  res.render('loading.ejs');
});
app.get('/home', function(req, res) {
  res.render('home.ejs');
});

app.get('/water', function(req, res) {
  res.render('water_intake.ejs');
});

app.get('/workout', function(req, res) {
  res.render('workout.ejs');
});

app.get('/register', function(req, res) {
  res.render('register.ejs');
});

app.get('/login', function(req, res) {
  res.render('login.ejs');
});

app.get('*', function(req, res) {
  res.render('error.ejs');
});

//POST requests
app.post('/water', db.addWater);
app.post('/register', db.register);
app.post('/login', db.login);
app.post('/addworkout', db.addWorkout);

app.listen(port, () => console.log(`The app is running on port: ${port}! Make sure to open it in your browser!`));
