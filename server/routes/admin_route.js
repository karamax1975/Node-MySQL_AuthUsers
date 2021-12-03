const adminRoutes = require('express').Router();
const adminController = require('../../controllers/admin_controller.js');




adminRoutes.get('/getUsers', adminController.getAllUsers)


module.exports = adminRoutes;