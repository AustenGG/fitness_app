const Sequelize = require('sequelize');
// const sequelize = new Sequelize('mysql://root:password@127.0.0.1:3306/instagram');
const sequelize = new Sequelize('fitness', 'rhydian', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize.authenticate().then(() => {
  console.log('Connection established');
}).catch (err => {
  console.error('Unable to connect: ', err);
});

const Water = sequelize.define('water', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user: {
    type: Sequelize.STRING
  },
  amount: {
    type: Sequelize.INTEGER
  }
});

const Users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

Users.sync();
Water.sync();

exports.register = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  Users.findOne({
    where: {username: username}
  }).then(users => {
    if (users == null) {
      Users.create({
        username: username,
        password: password
      });
      res.redirect('/login');
    }
    else {
      res.send({
        "code":204,
        "fail":"Usename already exists"
      });
    }
  });
};

exports.login = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  Users.findOne({
    where: {username: username}
  }).then(users => {
    if (users == null) {
      //Represents if username not found
      res.send({
        "code":204,
        "fail":"Usename address not found"
      });
    }
    else if (password == users.password){
      //Represents a sucessfull login
      req.session.username = users.username;
      req.session.userid = users.id;
      console.log('User ' + req.session.username + ' logged in, id:' + req.session.userid);
      res.redirect('/home');
    }
    else {
      //Represents matching username but incorrect password
      res.send({
        "code":204,
        "fail":"Username and password does not match"
      });
    }
  });
};

//Adds water intake to database
exports.addWater = function(req, res) {
  var amount = req.body.amount;
  Water.create({
    user: "testuser",
    amount: amount
  });
  res.redirect('/home');
}
