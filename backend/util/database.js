const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mailboxclient", "root", "qwertY@1", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { sequelize };
