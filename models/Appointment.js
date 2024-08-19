const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');
const User = require('./User');
const Service = require('./Service');
const Employee = require('./Employee');
const Branch = require('./Branch');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: true, 
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  service: {
    type: DataTypes.INTEGER,
    references: {
      model: Service,
      key: 'id',
    },
    allowNull: false,
  },
  employee: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id',
    },
    allowNull: true,
  },
  branch: {
    type: DataTypes.INTEGER,
    references: {
      model: Branch,
      key: 'id',
    },
    allowNull: false,
  },
  timeslot: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'Appointments',
});

// Define associations
Appointment.belongsTo(User, { foreignKey: 'userId' });
Appointment.belongsTo(Service, { foreignKey: 'service' });
Appointment.belongsTo(Employee, { foreignKey: 'employee' });
Appointment.belongsTo(Branch, { foreignKey: 'branch' });

module.exports = Appointment;
