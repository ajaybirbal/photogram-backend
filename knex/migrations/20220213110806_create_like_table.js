/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('likes', function (table) {
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
    return knex.schema.dropTable('likes');
};
