const Router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/database-config');

Router.get('/users', async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
        });

        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

Router.post('/users', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw Error('Content must contain name, username and password');
        }

        if (password.length < 8) {
            throw Error('Password must have at least 8 characters');
        }
        const hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, email, hash });

        res.status(200).json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        });
    } catch (err) {
        next(err);
    }
});

Router.delete('/users/', async (req, res, next) => {
    try {
        const { id } = req.user;

        const user = await User.destroy({ where: { id } });

        if (user === 0) {
            throw Error('User not found');
        }

        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = Router;
