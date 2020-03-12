const supertest = require('supertest');
const app = require('../src/config/app');
const mongoose = require('mongoose');
const Blog = require('../src/models/Blog');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    const newBlog = new Blog({
        title: 'Test Blog',
        author: 'Ze',
        url: 'ze.com',
        likes: 1
    });

    await newBlog.save();
});

describe('/api/blogs', () => {
    describe('GET', () => {
        test('All blogs are returned as json', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/);
        });

        test('For now there is only one blog', async () => {
            const response = await api.get('/api/blogs');

            expect(response.body.length).toBe(1);
        });

        test('Checking the existence of _id property', async () => {
            const response = await api.get('/api/blogs');

            expect(response.body[0]._id).toBeDefined();
        });
    });

    describe('POST', () => {
        test('Adding a new blog works, and /api/blogs returns 2 blogs', async () => {
            const newBlog = {
                title: 'Another Test Blog',
                author: 'Noone',
                url: 'noone.com',
                likes: 2
            };

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/);

            const response = await api.get('/api/blogs');

            expect(response.body.length).toBe(2);
        });

        test('Adding a new blog without the likes property, return a new blog with likes = 0', async () => {
            const newBlog = {
                title: 'Blog without Likes',
                author: 'Someone',
                url: 'someone.com'
            };

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/);

            const response = await api.get('/api/blogs');

            expect(response.body[1].likes).toBe(0);
        });

        test('Adding a new blog without author or url property returns a bad request(400)', async () => {
            const newBlog = {
                author: 'Without',
                url: 'without.com',
                likes: 15
            };

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400);
        });
    });
});

afterAll(() => {
    mongoose.connection.close();
});
