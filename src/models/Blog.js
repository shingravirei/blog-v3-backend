const { Sequelize, DataTypes } = require('sequelize');
const { DB_URI } = require('../config/env-vars');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: DB_URI,
    logging: false
});

const Blog = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Blog;
