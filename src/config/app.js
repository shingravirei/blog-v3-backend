const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { errorHandler, tokenExtractor } = require('./middleware');
const blogRouter = require('../routes/blog');
const usersRouter = require('../routes/users');
const loginRouter = require('../routes/login');

app.use(cors());
app.use(bodyParser.json());
app.use(tokenExtractor);

app.use('/api', blogRouter);
app.use('/api', usersRouter);
app.use('/api/login', loginRouter);

app.use(errorHandler);

module.exports = app;
