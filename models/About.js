const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const About = sequelize.define('About', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // URL to the image
    allowNull: true,
  }
}, {
  timestamps: true, 
  tableName: 'Abouts', 
});

module.exports = About;
