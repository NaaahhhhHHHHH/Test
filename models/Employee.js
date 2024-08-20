const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');
const Branch = require('./Branch');

const Employee = sequelize.define('Employee', {
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
    unique: false,
  },
  branch: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Branches', 
      key: 'id',
    },
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'Employees',
});

Employee.belongsTo(Branch, { foreignKey: 'branch' });

module.exports = Employee;
