require('dotenv').config();

const PORT = process.env.PORT || 7777;
let DB_URI = process.env.DB_URI;

const SECRET = process.env.SECRET;

if (process.env.NODE_ENV === 'test') {
    DB_URI = process.env.TEST_DB_URI;
}

module.exports = {
    PORT,
    DB_URI,
    SECRET
};
