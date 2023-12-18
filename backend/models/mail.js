const { DataTypes } = require("sequelize");

const { sequelize } = require("../util/database");

const Mail = sequelize.define("Mail", {
  sender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiver: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Mail;
