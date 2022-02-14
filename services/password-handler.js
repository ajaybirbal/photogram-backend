//Hashing and handling of the password here
require('dotenv').config()
const bcrypt = require('bcrypt');

/**
 * Generates hashed password.
 * @param {*} password 
 */
module.exports.hashPassword = async password => {

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    return await bcrypt.hash(password, salt);
}