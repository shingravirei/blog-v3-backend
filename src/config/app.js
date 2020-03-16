const express = require('express');
const app = express();
const helmet = require('helmet');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errorHandler } = require('./middleware');

const blogRouter = require('../routes/blog');
const usersRouter = require('../routes/users');
const loginRouter = require('../routes/login');

const { SECRET } = require('./env-vars');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(jwt({ secret: SECRET }).unless({ path: ['/api/login'] }));

app.use('/api', blogRouter);
app.use('/api', usersRouter);
app.use('/api/login', loginRouter);

app.use(errorHandler);

module.exports = app;
