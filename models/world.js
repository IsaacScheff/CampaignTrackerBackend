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
        type: Sequelize.STRING,
        defaultValue: 'https://media.nga.gov/iiif/bfd9e46b-4199-4456-9e0b-f42bb6ebea7e__640/full/!588,600/0/default.jpg'
    }
    //public/private enum
});