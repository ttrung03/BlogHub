// File: Backend/models/Role.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Role = sequelize.define('Role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Role;
