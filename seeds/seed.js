const sequelize = require('../config/connection');
const Car = require('../models/Car');

const carData = require('./carData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Car.bulkCreate(carData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
