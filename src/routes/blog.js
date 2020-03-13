const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const { Blog } = require('../models/database-config');
const { SECRET } = require('../config/env-vars');

Router.get('/blogs', async (req, res, next) => {
    try {
        const token = req.token;

        const { id } = jwt.verify(token, SECRET);

        if (!id) {
            throw Error('missing id');
        }

        const blogs = await Blog.findAll({
            where: { UserId: id },
            attributes: ['id', 'title', 'content', 'updatedAt']
        });

        res.json(blogs);
    } catch (err) {
        next(err);
    }
});

Router.post('/blogs', async (req, res, next) => {
    try {
        let { title, content } = req.body;

        const token = req.token;

        const { id } = jwt.verify(token, SECRET);

        if (!id) {
            throw Error('missing id');
        }

        if (!title || !content) {
            throw Error('title and/or url missing');
        }

        const newBlog = await Blog.create({
            title,
            content,
            UserId: id
        });

        res.status(201).json(newBlog);
    } catch (err) {
        next(err);
    }
});

Router.delete('/blogs/:id', async (req, res, next) => {
    try {
        const token = req.token;
        const { id } = req.params;

        const decodedToken = jwt.verify(token, SECRET);

        if (!id) {
            throw Error('missing id');
        }

        const result = await Blog.destroy({
            where: { id, UserId: decodedToken.id }
        });

        if (result === 0) {
            throw Error('Blog not found');
        }

        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

Router.put('/blogs/:id', async (req, res, next) => {
    try {
        let { title, content } = req.body;

        const { id } = req.params;

        const token = req.token;

        const decodedToken = jwt.verify(token, SECRET);

        if (!decodedToken.id) {
            throw Error('missing id');
        }

        if (!title || !content) {
            throw Error('title and/or url missing');
        }

        // If using postgres, you can just use Blog.update(content, options, returning: true)
        // That way you remove the props setters below, not needing to call blog.save()
        const blog = await Blog.findOne({
            where: { id, userId: decodedToken.id }
        });

        if (!blog) {
            throw Error('Blog not found');
        }

        blog.title = title;
        blog.content = content;

        await blog.save();

        res.json(blog);
    } catch (err) {
        next(err);
    }
});

module.exports = Router;
