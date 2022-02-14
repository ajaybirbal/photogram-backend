const { FOLLOWERS_DB_NAME } = require("../../db");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(FOLLOWERS_DB_NAME, function (table) {
        table.increments().primary()
        table.integer('leader_id').references('id').inTable('users').notNullable().onDelete('CASCADE')
        table.integer('follower_id').references('id').inTable('users').notNullable().onDelete('CASCADE')
        table.unique(['leader_id', 'follower_id'])
        table.check('?? >= ??', ['leader_id', 'follower_id']);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable(FOLLOWERS_DB_NAME);
};
