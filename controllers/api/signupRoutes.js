const router = require("express").Router();
const { Customer } = require(`../../models`);

// adds the customer data to the database, saves the session and logs the customer in
router.post("/signup", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    req.session.save(() => {
      req.session.email = customer.email;
      req.session.logged_in = true;
      res.json({ customer, message: "Account created" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;