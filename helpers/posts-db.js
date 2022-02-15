/**
 * Helper for handling db functions for posts
 */

const { knex, POSTS_DB_NAME, LIKES_DB_NAME } = require("../db");

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
 * Returns posts by a particular user. Ability to offset and limit number of posts. 
 * Also returns total posts by the user.
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
        .orderBy('created_at', 'desc');
}

/**
 * Deletes post from the posts table.
 * @param {*} postID 
 * @returns 
 */
module.exports.deletePost = async postID => {
    let result = null, errResult = null;

    try {
        result = await knex(POSTS_DB_NAME)
            .where('id', Number(postID))
            .del();
    } catch (error) {
        errResult = error;
    }

    return {
        result,
        error: errResult
    }
}

/**
 * Returns total number of posts by the user
 * @param {*} userId 
 */
module.exports.getUserPostCount = async userId => {

    return await knex(POSTS_DB_NAME)
        .count()
        .groupBy('user_id')
        .having('user_id', '=', userId);
}

/**
 * Whether post is liked by the user. Returns boolean
 */
module.exports.getPostLikedByParticularUser = async (postID, userID) => {
    const result = await knex(LIKES_DB_NAME)
                    .where({
                        user_id: userID,
                        post_id: postID
                    });

    if (result.length === 1) {
        return true;
    }

    return false;
}