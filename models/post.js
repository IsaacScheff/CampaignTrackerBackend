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
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING
    }
});