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
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//GET requests
app.get('/BMI', function(req, res) {
  if (req.session.username == null) {
    res.redirect('/login');
  }
  else {
      res.render('BMI.ejs');
  }
});
app.get('/BMR', function(req, res) {
  if (req.session.username == null) {
    res.redirect('/login');
  }
  else {
    res.render('BMR.ejs');
  }
});
app.get('/', function(req, res) {
  res.render('loading.ejs');
});
app.get('/home', function(req, res) {
  if (req.session.username == null) {
    res.redirect('/login');
  }
  else {
    res.render('home.ejs', {user: req.session.username});
  }
});
app.get('/water', (req, res) => {
  if (req.session.username == null) {
    res.redirect('/login');
  }
  else {
    db.getWater(req, res);
  }
});
app.get('/logout', function(req, res) {
  req.session.username = null;
  res.redirect('/login');
});

app.get('/workout', function(req, res) {
  if (req.session.username == null) {
    res.redirect('/login');
  }
  else {
    db.getWorkouts(req, res);
  }
});
app.get('/register', function(req, res) {
  res.render('register.ejs');
});
app.get('/login', function(req, res) {
  res.render('login.ejs');
});
app.get('/graph', function(req, res) {
  res.render('graph.ejs');
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
