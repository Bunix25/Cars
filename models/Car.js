const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a new Sequelize model for cars
class Car extends Model { }

Car.init(
  {
    carId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DECIMAL
    },
    image: {
      type: DataTypes.STRING
    },
  },
  {
    // Link to database connection
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'cars'
  }
);

module.exports = Car;
