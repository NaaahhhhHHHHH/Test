const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, 
  tableName: 'Customers', 
});

module.exports = Customer;
