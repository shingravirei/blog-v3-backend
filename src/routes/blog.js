const Router = require('express').Router();
const { Blog } = require('../models/database-config');

Router.get('/blogs/all', async (req, res, next) => {
    try {
        const blogs = await Blog.findAll({
            attributes: ['id', 'title', 'content', 'updatedAt']
        });

        res.json(blogs);
    } catch (err) {
        next(err);
    }
});

Router.get('/blogs/:blogId', async (req, res, next) => {
    try {
        const { blogId } = req.params;

        const { id } = req.user;

        const blog = await Blog.findOne({ where: { id: blogId, UserId: id } });

        if (!blog) {
            throw Error('Blog not found');
        }

        res.json(blog);
    } catch (err) {
        next(err);
    }
});

Router.post('/blogs', async (req, res, next) => {
    try {
        const { title, content } = req.body;

        const { id } = req.user;

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

Router.delete('/blogs/:blogId', async (req, res, next) => {
    try {
        const { blogId } = req.params;

        const { id } = req.user;

        const result = await Blog.destroy({
            where: { id: blogId, UserId: id }
        });

        if (result === 0) {
            throw Error('Blog not found');
        }

        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

Router.put('/blogs/:blogId', async (req, res, next) => {
    try {
        const { title, content } = req.body;

        const { blogId } = req.params;

        const { id } = req.user;

        if (!title || !content) {
            throw Error('title and/or content missing');
        }

        // If using postgres, you can just use Blog.update(content, options, returning: true)
        // That way you remove the props setters below, not needing to call blog.save()
        const blog = await Blog.findOne({
            where: { id: blogId, userId: id }
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
