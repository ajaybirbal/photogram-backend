const { POSTS_DB_NAME } = require("../../db");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(POSTS_DB_NAME, function(table) {
        table.increments().primary()
        table.string('url', 255).notNullable()
        table.text('body', 255).nullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        table.integer('user_id').references('id').inTable('users').notNullable().onDelete('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable(POSTS_DB_NAME);
};