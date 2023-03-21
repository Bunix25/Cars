const router = require('express').Router();
const Customer = require('../../models/Customer');
//const Reservation = require('../../models/Reservation');

// Logs the customer in if email and password match in the database, saves the session and renders the gallery page
router.post('/logmein', async (req, res) => {
  try {
    const customerData = await Customer.findOne({
      attributes: ['email', 'customer_id', 'password'],
      where: {
        email: req.body.email
      }
    })
    const customer = customerData.get({ plain: true });
    console.log(customer.customer_id)
    if (!customer.email) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await customerData.checkPassword(req.body.password);
    console.log(validPassword)
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return
    }
    req.session.save(() => {
      req.session.email = customer.email;
      req.session.customer_id = customer.customer_id,
        req.session.logged_in = true;
      console.log(
        '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );
      res.render('gallery', {
        logged_in: req.session.logged_in,
        customer_email: req.session.email
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logs the user out and destroys the session
router.post('/logmeout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect(`/`);
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Create a new POST route for fetching a customer by email
router.post('/customerbyemail', async (req, res) => {
  try {
    const customerData = await Customer.findOne({ where: { email: req.body.email } });
    const customer = customerData.get({ plain: true });
    if (!customer) {
      res.status(404).json({ message: 'No customer found with this email.' });
      return;
    }
    res.json({ customerId: customer.customerId });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new customer
router.post('/customer', async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// **** FUTURE FEATURE DEVELOPMENT **** 
/*  
// GET all customers
router.get('/customers', async (req, res) => {
    try {
      const customers = await Customer.findAll();
      res.status(200).json(customers);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // PUT update an existing customer id
  router.put('/customer/:id', async (req, res) => {
    try {
      const updatedCustomer = await Customer.update(req.body, {
        where: { id: req.params.id }
      });
      if (updatedCustomer[0] === 0) {
        res.status(404).json({ message: 'Customer not found' });
      } else {
        res.status(200).json({ message: 'Customer updated successfully' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // DELETE an existing customer by customer_id
router.delete('/customer/:id', async (req, res) => {
  try {
    // Check if there are any associated reservations
    const reservations = await Reservation.findAll({
      where: { customerId: req.params.id },
    });

    // If there are reservations, return an error message
    if (reservations.length > 0) {
      res.status(400).json({
        message: 'Cannot delete customer with associated reservations.',
      });
      return;
    }

    // If no reservations, proceed with deletion
    const deletedCustomer = await Customer.destroy({
      where: { customerId: req.params.id },
    });
    if (!deletedCustomer) {
      res.status(404).json({ message: 'Customer not found' });
    } else {
      res.status(200).json({ message: 'Customer deleted successfully' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
 */

module.exports = router;

