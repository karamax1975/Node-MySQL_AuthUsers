
const { registration, userActivate, logIn } = require('../service/user-service.js');


class User {

  // constructor() {
  //   token.sync();
  //   user.sync();
  // }

  async registration(req, res, next) {
    try {
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
      const token = await userService.logOut(referenceToken);
      res.clearCookie('referenceToken');
      return res.json(token);

    } catch (e) {
      console.log(e);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    const checkUser = await logIn(email, password);

    try {
      const { userToken, isActivated } = checkUser;
      if (!isActivated) {
        res.redirect(`${process.env.API_URL}/messages`) /// page width info for email active
      } else {
        res.cookie('referenceToken', userToken.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        res.send("Ok") /// redirect for admin page 
      }
    } catch (e) {
      console.log(e);
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

}

module.exports = new User();