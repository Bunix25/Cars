const Car = require('./Car');
const Reservation = require('./Reservation');
const Customer = require("./Customer")

Car.hasMany(Reservation, {
  foreignKey: 'car_id',
});

Reservation.belongsTo(Car, {
  foreignKey: 'car_id',
});

module.exports = { Car, Reservation, Customer };

