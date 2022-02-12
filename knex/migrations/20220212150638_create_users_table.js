/**
 * Adds Users table with id,fname, lname, password, description and created_at
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments().primary()
        table.string('fname', 40).notNullable()
        table.string('lname', 40).notNullable()
        table.string('email', 255).notNullable().unique()
        table.string('password', 50).notNullable()
        table.text('desc').nullable()
        table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
        table.string('userhandle', 40).notNullable().unique()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};