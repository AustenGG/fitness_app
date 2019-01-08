const Sequelize = require('sequelize');
// const sequelize = new Sequelize('mysql://root:password@127.0.0.1:3306/instagram');
const sequelize = new Sequelize('fitness', 'user', 'password', {
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
Water.sync();

exports.addWater = function(req, res) {
  var amount = req.body.amount;
  Water.create({
    user: "testuser",
    amount: amount
  });
  res.redirect('/home');
}
