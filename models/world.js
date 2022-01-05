const db = require('./database');
const Sequelize = require('sequelize');

module.exports = db.define("World", {
    Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.TEXT
    },
    imageUrl: {
        type: Sequelize.STRING
    }
    //public/private enum
});