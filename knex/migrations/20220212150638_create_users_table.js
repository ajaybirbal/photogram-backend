const { USERS_DB_NAME } = require("../../db");

/**
 * Adds Users table with id,fname, lname, password, description and created_at
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(USERS_DB_NAME, function(table) {
        table.increments().primary()
        table.string('fname', 40).notNullable()
        table.string('lname', 40).notNullable()
        table.string('email', 255).notNullable().unique()
        table.string('password', 100).notNullable()
        table.text('desc').nullable()
        table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
        table.string('userhandle', 40).notNullable().unique()
        table.string('profilepicurl', 255).nullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable(USERS_DB_NAME);
};