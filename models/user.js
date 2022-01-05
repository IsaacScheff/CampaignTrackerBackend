const db = require('./database');
const Sequelize = require('sequelize');

module.exports = db.define("User", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      isEmail: true,
      allowNull: false
    }
    //add password + authentication 
});