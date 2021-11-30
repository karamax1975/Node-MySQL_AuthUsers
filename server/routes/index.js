const userController = require('../../controllers/user_controller.js');


const indexRouter = require('express').Router();

indexRouter.post('/registration', userController.registration);
indexRouter.get('/activate/:link', userController.activate);
indexRouter.post('/logIn', userController.login)

// indexRouter.get('/users', userController.getUser)



module.exports = indexRouter;