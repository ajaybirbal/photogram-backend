const { LIKES_DB_NAME } = require("../../db");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable(LIKES_DB_NAME, function (table) {
        table.increments().primary()
        table.integer('user_id').references('id').inTable('users').notNullable().onDelete('CASCADE')
        table.integer('post_id').references('id').inTable('posts').notNullable().onDelete('CASCADE')
        table.unique(['user_id', 'post_id'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable(LIKES_DB_NAME);
};
