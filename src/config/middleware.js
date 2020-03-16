const errorHandler = (err, req, res, next) => {
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).send({ error: 'username already in use' });
    }

    if (err.name === 'JsonWebTokenError' || err.message === 'missing id') {
        return res.status(401).send({ error: 'token missing or invalid' });
    }

    return res.status(400).send({ error: err.message });
};

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7);
    } else {
        req.token = null;
    }

    next();
};

module.exports = { errorHandler, tokenExtractor };
