module.exports.knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'admin',
        database: 'photogram'
    }
});

module.exports.USERS_DB_NAME = 'users';
module.exports.POSTS_DB_NAME = 'posts';