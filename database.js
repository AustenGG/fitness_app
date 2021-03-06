const Sequelize = require('sequelize');
const sequelize = new Sequelize('fitness', 'rhydian', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false,
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

const Workout = sequelize.define('workout', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user: {
    type: Sequelize.STRING
  },
  workout: {
    type: Sequelize.STRING
  }
});
const Food = sequelize.define('food', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user: {
    type: Sequelize.STRING
  },
  food: {
    type: Sequelize.STRING
  },
  calories: {
    type: Sequelize.STRING
  }
});

const Weight = sequelize.define('weight', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement : true
  },
  user: {
    type: Sequelize.STRING
  },
  weight: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.DATEONLY
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

//Creates the tables if they don't already exist
Users.sync();
Water.sync();
Workout.sync();
Weight.sync();
Food.sync();


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
      console.log('User ' + req.session.username + ' logged in');
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
  var user = req.session.username;
  if (amount == "") {
    res.redirect('/water');
  }
  else {
    Water.create({
      user: user,
      amount: amount
    });
    res.redirect('/water');
  }
};

//Retrieves the logged in user's water history
exports.getWater = function(req, res) {
  var user = req.session.username;
  //console.log(user);
  Water.findAll( {where: {user: user} }).then(data => {
    if (data == null) {
      //Represents if username not found
      res.send({
        "code":204,
        "fail":"No information for current user"
      });
    }
    else {
      //console.log(data);
      res.render('water_intake.ejs', { data: data, user});
    }
  });
};

//Retrieves the logged in user's workout history
exports.getWorkouts = function(req, res) {
  var user = req.session.username;
  //console.log(user);
  Workout.findAll( {where: {user: user} }).then(data => {
    if (data == null) {
      //Represents if username not found
      res.send({
        "code":204,
        "fail":"No information for current user"
      });
    }
    else {
      res.render('workout.ejs', { data: data, user});
    }
  });
};

//Adds a workout to the database
exports.addWorkout = function(req, res) {
  var workout = req.body.workout;
  var user = req.session.username;
  Workout.create({
    user: user,
    workout: workout
  });
  res.redirect('/workout');
};

exports.getHome = function(req, res) {
  var user = req.session.username;
  //var waterData = [];
  //var workoutData = [];
  Water.findAll({
    limit: 1,
    where: {user: user},
    order: [ [ 'createdAt', 'DESC' ]]
  }).then(waterData => {
    //console.log(data);
    //waterData = data;
    Workout.findAll({
      limit: 1,
      where: {user: user},
      order: [ [ 'createdAt', 'DESC' ]]
    }).then(workoutData => {
      //workoutData = data;
      Weight.findAll({
        limit: 1,
        where: {user: user},
        order: [ [ 'date', 'DESC' ]]
      }).then(weightData => {
        //workoutData = data;
        var data = [];
        data.push(waterData);
        data.push(workoutData);
        data.push(weightData);
        //console.log(data);
        //console.log(data[0][0].dataValues.amount);
        res.render('home.ejs', {data: data, user});

      });
    });
  });

  //res.render('home.ejs', {data: waterData, workoutData, user});
  //console.log(waterData);
  //console.log(workoutData);
};

exports.addWeight = function(req, res) {
  var weight = req.body.weight;
  var date = req.body.date;
  var user = req.session.username;
  Weight.findOne({
    where: {user: user, date: date}
  }).then(result => {
    if (weight == "" || date == "") {
      res.redirect('/weight');
    }
    else if (result == null) {
      Weight.create({
        user: user,
        weight: weight,
        date: date
      });
      res.redirect('/weight');
    }
    else {
      res.send({
        "code":204,
        "fail":"Entry for that date already exists"
      });
    }
  });
}
exports.getFood = function(req, res) {
  var user = req.session.username;
  //console.log(user);
  Food.findAll( {where: {user: user} }).then(data => {
    if (data == null) {
      //Represents if username not found
      res.send({
        "code":204,
        "fail":"No information for current user"
      });
    }
    else {
      console.log(data);
      res.render('food.ejs', { data: data, user});
    }
  });
};

exports.getWeight = function(req, res) {
  var user = req.session.username;
  Weight.findAll( {where: {user: user},
    order: [ [ 'date', 'DESC' ]]}).then(data => {
      if (data == null) {
        //Represents if username not found
        res.send({
          "code":204,
          "fail":"No information for current user"
        });
      }
      else {
        var weight_data = [];
        var date_data = [];
        for (var i=0; i < data.length; i++) {
          weight_data.push(data[i].dataValues.weight);
          date_data.push(data[i].dataValues.date);
        }
        res.render('weight.ejs', {weight_data, date_data, user});
      }
    });
  };
//Adds a workout to the database
exports.addFood = function(req, res) {
  var food = req.body.food;
  var user = req.session.username;
  var calories = req.body.calories;
  Food.create({
    user: user,
    food: food,
    calories: calories

  });
  res.redirect('/food');
};
