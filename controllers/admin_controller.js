const { user } = require('../models/index_model');

class Admin {

  async getAllUsers(req, res, next) {
    const arrUsers = [];
    const allUsers = await user.findAll();
    for (const user of allUsers) {
      const { id, email, isActivated, createdAt, updatedAt } = user.dataValues;
      arrUsers.push({ id, email, isActivated, createdAt, updatedAt });
    }
    res.json(arrUsers)
  }

}

module.exports = new Admin();