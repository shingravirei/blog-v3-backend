const express = require('express');
const helmet = require('helmet');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const { errorHandler } = require('./middleware');

const app = express();

const blogRouter = require('../routes/blog');
const usersRouter = require('../routes/users');
const loginRouter = require('../routes/login');

const { SECRET } = require('./env-vars');

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(
    jwt({ secret: SECRET }).unless({ path: ['/api/login', '/api/blogs/all'] })
);

app.use('/api', blogRouter);
app.use('/api', usersRouter);
app.use('/api/login', loginRouter);

app.use(errorHandler);

module.exports = app;
