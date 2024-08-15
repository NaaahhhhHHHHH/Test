const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const Category = sequelize.define('Category', {

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {

  timestamps: true,
  tableName: 'Categories'
});

module.exports = Category;
