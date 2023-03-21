// **** FUTURE FEATURE DEVELOPMENT ****
/* 
const router = require(`express`).Router();
const Car = require(`../models`);

// POST a new car
router.post('/cars', async (req, res) => {
    try {
      const newCar = await Car.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // PUT update an existing car
  router.put('/cars/:id', async (req, res) => {
    try {
      const updatedCar = await Car.update(req.body, {
        where: { id: req.params.id }
      });
      if (updatedCar[0] === 0) {
        res.status(404).json({ message: 'Car not found' });
      } else {
        res.status(200).json({ message: 'Car updated successfully' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // DELETE an existing car
  router.delete('/cars/:id', async (req, res) => {
    try {
      const deletedCar = await Car.destroy({
        where: { id: req.params.id }
      });
      if (!deletedCar) {
        res.status(404).json({ message: 'Car not found' });
      } else {
        res.status(200).json({ message: 'Car deleted successfully' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  //This has no withAuth
  router.get(`/`, async (req, res) => {
    try {
      const customerData = await Customer.findAll({
        attributes: { exclude: [`passsword`] },
      });
      // serialzng data 
      const customer = customerData.map((project) => project.get({ plain: true }));
  
      const carsData = await Car.findAll({});
      const cars = carsData.map((car) => car.get({ plain: true }));
  
      res.render(`home`, {
        customer,
        logged_in: req.session.logged_in,
        cars
      });
    } catch (err) {
      res.status(404).json(err);
    }
  });
  
  router.get(`/login`, (req, res) => {
    if (req.session.logged_in) {
       res.redirect(`/home`);
       return;
    }
    res.render(`login`);
  });
  
  module.exports = router; */