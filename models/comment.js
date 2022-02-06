const db = require('./database');
const Sequelize = require('sequelize');

module.exports = db.define("Comment", {
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING
    }
});