const express = require('express');
const reminderRoute = require('./reminder.route');
const tradeRoute = require('./trade.route');

const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/reminders',
    route: reminderRoute,
  },
  {
    path: '/trades',
    route: tradeRoute,
  },

];

const devRoutes = [
  // routes available only in development mode
  // {
  //   path: '/docs',
  //   route: docsRoute,
  // },
];

defaultRoutes.forEach((route) => {
  router.get("/ping", (req, res) => {
    const now = new Date();
  
    return res.status(200).json({
      status: "Welcome to Josh API, not the response you were expecting? Please check out our documentation at https://monyeijosh.herokuapp.com/",
      timestamp: "" + now.toLocaleString(),
    });
  });
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
