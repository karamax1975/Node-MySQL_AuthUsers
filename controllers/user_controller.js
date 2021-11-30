const db = require('../models/index_model.js');
const { registration, userActivate, userCheck } = require('../service/user-service.js');

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

  async login(req, res, next) {
    const { email, password } = req.body;
    const check = await userCheck(email, password);
    try {
      const { id, isActivated, email } = check;
      if (!isActivated) {
        res.redirect(`${process.env.API_URL}/messages`) /// page width info for email active
      } else {
        // const { referenceToken } = req.cookies;
        res.send("Ok")
        console.log("Acsess Ok");
      }

    } catch (e) {
      console.log(e);
      res.send(e.message)
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