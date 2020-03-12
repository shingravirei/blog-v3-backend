const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const { Blog } = require('../models/database-config');
const User = require('../models/User');
const { SECRET } = require('../config/env-vars');

Router.get('/blogs', async (req, res, next) => {
    try {
        const blogs = await Blog.findAll({});

        res.json(blogs);
    } catch (err) {
        next(err);
    }
});

Router.get('/blogs/:username', async (req, res, next) => {
    const token = req.token;

    try {
        const decodedToken = jwt.verify(token, SECRET);

        if (!token || !decodedToken.id) {
            throw new Error('missing id');
        }

        const blogs = await User.find({ username: decodedToken.username });

        res.json(blogs);
    } catch (err) {
        next(err);
    }
});

Router.post('/blogs', async (req, res, next) => {
    let { title, author, url, likes } = req.body;

    const token = req.token;

    try {
        const decodedToken = jwt.verify(token, SECRET);

        if (!token || !decodedToken.id) {
            throw new Error('missing id');
        }

        if (typeof title === 'undefined' || typeof url === 'undefined') {
            throw new Error('title and/or url missing');
        }

        if (typeof likes === 'undefined') {
            likes = 0;
        }

        const user = await User.findById({ _id: decodedToken.id });

        const blog = new Blog({
            title,
            author,
            url,
            likes,
            user: user._id
        });

        const result = await blog.save();

        user.blogs = user.blogs.concat(result._id);
        await user.save();

        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
});

Router.delete('/blogs/:id', async (req, res, next) => {
    const token = req.token;
    const { id } = req.params;

    try {
        const decodedToken = jwt.verify(token, SECRET);

        if (!token || !decodedToken.id) {
            throw new Error('missing id');
        }

        await Blog.findByIdAndDelete({ _id: id });

        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

Router.put('/blogs/:id', async (req, res, next) => {
    const { id } = req.params;
    const { title, author, url, likes } = req.body;

    try {
        if (!title || !author || !url || !likes) {
            throw Error('Request data missing');
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, author, url, likes },
            { new: true }
        );

        res.json(updatedBlog);
    } catch (err) {
        next(err);
    }
});

module.exports = Router;
