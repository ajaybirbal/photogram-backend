/**
 * Functions to handle likes DB.
 */

const { knex, LIKES_DB_NAME, USERS_DB_NAME } = require("../db");

/**
 * Likes a particular post.
 * @param {*} postID 
 * @param {*} likerID 
 * @returns 
 */
module.exports.likePost = async (postID, likerID) => {
    let result = null, errResult = null;

    try {
        result = await knex(LIKES_DB_NAME).insert({
            user_id: likerID,
            post_id: postID
        })
    } catch (error) {
        errResult = error;
    }

    return {
        result, 
        error: errResult
    }
}


/**
 * Dislikes a post.
 * @param {*} postID 
 * @param {*} likerID 
 */
module.exports.dislikePost = async (postID, likerID) => {
    let result = null, errResult = null;

    try{
        result = await knex(LIKES_DB_NAME)
                    .where({post_id: postID, user_id: likerID})
                    .del();
    } catch(error){
        errResult = error;
    }

    return {
        result: result,
        error: errResult
    }
}

/**
 * Counts the number of likes in a post.
 * @param {*} postID 
 */
module.exports.getPostLikesCount = async postID => {
    return await knex(LIKES_DB_NAME)
                    .count()
                    .groupBy('post_id')
                    .having('post_id', '=', postID);
} 

/**
 * Gets a list of post likers.
 */
module.exports.getPostLikers = async (postID, limit = 12, offset = 0) => {
    return await knex(LIKES_DB_NAME)
                            .join(USERS_DB_NAME, 'user_id', '=', `${USERS_DB_NAME}.id`)
                            .where('post_id', '=', postID)
                            .select('userhandle')
                            .distinct()
                            .limit(limit)
                            .offset(offset)

}