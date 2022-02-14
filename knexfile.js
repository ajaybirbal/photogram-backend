require('dotenv').config()

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    development: {
        client: 'pg',
        connection: {
            host: process.env.DEVELOPMENT_DB_HOST,
            user: process.env.DEVELOPMENT_DB_USER,
            password: process.env.DEVELOPMENT_DB_PASS,
            database: process.env.DEVELOPMENT_DBNAME,
            charset: 'utf8',
            port: process.env.DEVELOPMENT_DB_PORT
        },
        migrations: {
            directory: __dirname + '/knex/migrations',
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DBNAME,
            charset: 'utf8',
            port: process.env.DB_PORT
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DBNAME,
            charset: 'utf8',
            port: process.env.DB_PORT
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};