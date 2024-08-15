const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');
const Category = require('./Category.js');

const Service = sequelize.define('Service', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id',
    }
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Service.belongsTo(Category, { foreignKey: 'category' });
Category.hasMany(Service, { foreignKey: 'category' });

module.exports = Service;
