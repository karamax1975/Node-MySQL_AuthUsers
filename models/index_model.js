const Sequelize = require('sequelize');

const sequelize = new Sequelize("tmp", "root", "", {
  dialect: "mysql",
  host: "localhost"
});

const db = {}
db.sequelize = sequelize;
db.user = require('./user_model.js')(sequelize)
db.token = require('./token_model.js')(sequelize)



module.exports = db;