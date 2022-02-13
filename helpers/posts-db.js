/**
 * Helper for handling db functions for posts
 */

const { knex, POSTS_DB_NAME } = require("../db");

/**
 * Inserts new posts in the db.
 * @param {*} url 
 * @param {*} body 
 * @param {*} user_id 
 * @returns 
 */
module.exports.createNewPost = async (url, body, user_id) => {
    let result = null,
        errResult = null;

    try {
        result = await knex(POSTS_DB_NAME).insert({
            url,
            body,
            user_id
        })
    } catch (error) {
        errResult = error
    }

    return {
        result,
        errResult
    }
}

/**
 * Returns single post from the database.
 * @param {*} postID 
 * @returns 
 */
module.exports.getSinglePost = async postID => {
    return await knex.select('id', 'url', 'body', 'created_at', 'user_id')
                                .from(POSTS_DB_NAME)
                                .where('id', postID)
}

/**
 * Returns posts by a particular user.
 * @param {*} userId 
 * @param {*} limit 
 * @param {*} offset 
 */
module.exports.getUserPosts = async (userId, limit = 9, offset = 0) => {
    return await knex.select('id', 'url', 'body', 'created_at', 'user_id')
                        .from(POSTS_DB_NAME)
                        .where('user_id', userId)
                        .limit(limit)
                        .offset(offset)
}


module.exports.deletePost = async postID => {
    let result = null, errResult = null;

    try{
        result = await knex(POSTS_DB_NAME)
                    .where('id', Number(postID))
                    .del();
    } catch(error){
        errResult = null;
    }

    return {
        result,
        error: errResult
    }
}