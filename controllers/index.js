const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashBoardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashBoardRoutes);

module.exports = router;
