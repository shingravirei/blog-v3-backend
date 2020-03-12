const { Sequelize, DataTypes } = require('sequelize');
const { DB_URI } = require('../config/env-vars');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: DB_URI,
    logging: false
});

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
