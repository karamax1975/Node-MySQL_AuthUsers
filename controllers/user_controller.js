
const { registration, userActivate, logIn, refreshUserToken, userLogOut } = require('../service/user-service.js');
const { validationResult } = require('express-validator');

class User {

  // constructor() {
  //   token.sync();
  //   user.sync();
  // }

  async registration(req, res, next) {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return next(res.json({ error: error.array(), message: "Error validation" }));
      }
      const { email, password } = req.body;
      const newUser = await registration(email, password);
      res.cookie('referenceToken', newUser.referenceToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      res.json(newUser);
    } catch (e) {
      console.log(e);
      res.send(e.message)
    }
  }

  async logOut(req, res, next) {
    const { referenceToken } = req.cookies;
    try {
      const token = await userLogOut(referenceToken);
      res.clearCookie('referenceToken');
      return res.json(token);

    } catch (e) {
      console.log(e);
    }
  }

  async login(req, res, next) {
    try {
      const error = validationResult(req.body.data);
      if (!error.isEmpty()) {
        return next(res.json({ error: error.array(), message: "Error validation" }));
      }

      const { email, password } = req.body.data;
      const checkUser = await logIn(email, password);
      const { userToken, isActivated } = checkUser;
      if (!isActivated) {
        res.redirect(`${process.env.API_URL}/messages`) /// page width info for email active
      } else {
        res.cookie('referenceToken', userToken.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        res.json(checkUser)
      }
    } catch (e) {
      console.log(e);
    }

  }

  async refresh(req, res, next) {
    try {
      const data = await refreshUserToken(req.cookies.referenceToken);
      const { userToken } = data;
      res.cookie('referenceToken', userToken.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      res.json(data)
    } catch (e) {
      console.log(e);
      res.json({ status: false, message: e.message })
    }


  }


  async activate(req, res, next) {
    try {
      const findUser = await userActivate(req.params.link);
      if (findUser) res.redirect(process.env.API_URL)
    } catch (e) {
      console.log(e);
      res.send(e.message)
    }
  }


  async getAllUsers(req, res, next) {

    res.json({ status: 'Ok' })
  }

}

module.exports = new User();