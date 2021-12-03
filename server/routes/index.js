const userController = require('../../controllers/user_controller.js');
const { body } = require('express-validator');

const indexRouter = require('express').Router();

indexRouter.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration);
indexRouter.get('/activate/:link', userController.activate);
indexRouter.post('/logIn',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.login);
indexRouter.post('/logOut', userController.logOut);
indexRouter.post('/refresh', userController.refresh);



module.exports = indexRouter;