const router = require('express').Router();
const reservationRoutes = require('./api/reservationRoutes');
const homeRoutes = require('./home-routes');
const customerRoutes = require('./api/customerRoutes');
const signupRoutes = require('./api/signupRoutes');

router.use('/', homeRoutes);
router.use('/', reservationRoutes);
router.use('/api', customerRoutes);
router.use('/', signupRoutes);

module.exports = router;