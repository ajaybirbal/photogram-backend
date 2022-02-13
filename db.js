require('dotenv').config()

module.exports.knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DBNAME
    }
});

module.exports.USERS_DB_NAME = 'users';
module.exports.POSTS_DB_NAME = 'posts';