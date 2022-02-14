/**
 * Contains functions for managing users in the database.
 */

const { USERS_DB_NAME, knex } = require("../db");
const { hashPassword } = require("../services/password-handler");

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
    const hashedPassword = await hashPassword(password);

    let result = null,
        errResult = null;

    try {
        result = await knex(USERS_DB_NAME).insert({
            fname,
            lname,
            email,
            password: hashedPassword,
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

/**
 * Gets users info from the database.
 * @param {*} userID 
 * @returns 
 */
module.exports.getUserInfo = async userID => {
    return await knex(USERS_DB_NAME)
                    .select('id', 'fname', 'lname', 'userhandle', 'desc')
                    .where('id', userID)
}

/**
 * Deletes users from the database.
 * @param {*} userId 
 * @returns 
 */
module.exports.deleteUser = async userId => {
    let result = null, errResult = null;

    try{
        result = await knex(USERS_DB_NAME)
                    .where('id', Number(userId))
                    .del();
    } catch(error){
        errResult = null;
    }

    return {
        result,
        error: errResult
    }
}