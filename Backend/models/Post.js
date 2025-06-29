const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./User'); // import để khai báo quan hệ

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

// Thiết lập khóa ngoại authorId (thay thế ref trong Mongoose)
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

module.exports = Post;
