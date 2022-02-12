/**
 * Contains functions for managing users in the database.
 */

const { USERS_DB_NAME, knex } = require("../db")

/**
 * Adds  new user to the database. Returns result if user is created else returns the error.
 * @param {*} fname 
 * @param {*} lname 
 * @param {*} email 
 * @param {*} password 
 * @param {*} desc 
 * @returns 
 */
module.exports.createNewUser = async(fname, lname, email, password, userhandle, desc = '') => {

    //hashed password function later
    const hashed = password

    let result = null,
        errResult = null;

    try {
        result = await knex(USERS_DB_NAME).insert({
            fname,
            lname,
            email,
            password: hashed,
            userhandle,
            desc
        })
    } catch (error) {
        errResult = error
    }

    return {
        result,
        errResult: errResult ? errResult : null
    }
}