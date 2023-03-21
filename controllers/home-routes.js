const router = require(`express`).Router();
const { Car } = require(`../models`);
const withAuth = require(`../utilis/auth`);

// GET all cars data and render the home page
router.get('/home', async (req, res) => {
  try {
    const carsData = await Car.findAll();
    const cars = carsData.map((car) => car.get({ plain: true }));
    res.render('home', {
      cars,
      logged_in: req.session.logged_in,
      customer_email: req.session.email
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//get all cars data and render the gallery page
router.get('/gallery', async (req, res) => {
  try {
    const carsData = await Car.findAll();
    const cars = carsData.map((car) => car.get({ plain: true }));
    console.log(cars)
    res.render('gallery', {
      cars,
      logged_in: req.session.logged_in,
      customer_email: req.session.email
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET one car by id
router.get('/rent/:car_id', withAuth, async (req, res) => {
  try {
    const carsData = await Car.findByPk(req.params.car_id);
    const cars = carsData.get({ plain: true });
    console.log(cars);
    if (!cars) {
      res.status(404).json({ message: 'Car not found' });
    }
    console.log(req.session.email);
    res.render('rent', {
      cars,
      logged_in: req.session.logged_in,
      customer_email: req.session.email
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get all cars data and render the home page on the root /
router.get(`/`, async (req, res) => {
  try {
    const carsData = await Car.findAll();
    const cars = carsData.map((car) => car.get({ plain: true }));

    res.render('home', {
      cars,
      logged_in: req.session.logged_in,
      customer_email: req.session.email
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Renders the login page
router.get(`/login`, (req, res) => {
  if (req.session.logged_in) {
    res.redirect(`/home`);
    return;
  }
  res.render(`login`);
});

module.exports = router;
