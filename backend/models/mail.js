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
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deletedBySender: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deletedByReceiver: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Mail;
