const db = require('./database');
const Sequelize = require('sequelize');

module.exports = db.define("Post", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING
    }
    //date/time posted
});