const { DataTypes } = require('sequelize')



module.exports = (sequelize) => {
  return sequelize.define('token', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    referenceToken: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }

  })
}