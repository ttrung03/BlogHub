const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bloghub_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false // Bỏ nếu bạn muốn log SQL query
});

module.exports = sequelize;
