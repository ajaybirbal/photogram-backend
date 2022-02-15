const { FOLLOWERS_DB_NAME, knex, USERS_DB_NAME } = require("../db")

/**
 * Adds a new follower to the leader ID in the database.
 * @param {*} leaderID 
 * @param {*} followerID 
 */
module.exports.addNewFollower = async (leaderID, followerID) => {
    try {
        return await knex(FOLLOWERS_DB_NAME).insert({
            leader_id: leaderID,
            follower_id: followerID
        })
    } catch (error) {

    }
}

/**
 * Unfollows a particular profile.
 * @param {*} leaderID 
 * @param {*} followerID 
 * @returns 
 */
module.exports.unfollowProfile = async (leaderID, followerID) => {
    try {
        return await knex(FOLLOWERS_DB_NAME).where({
            leader_id: leaderID,
            follower_id: followerID
        }).del();
    } catch (error) {

    }
}

/**
 * Returns the number of followers
 * @param {*} postID 
 */
module.exports.countFollowers = async leaderID => {
    try {
        return await knex(FOLLOWERS_DB_NAME)
            .count()
            .groupBy('leader_id')
            .having('leader_id', '=', leaderID);
    } catch (error) {

    }
}

/**
 * Check whether a person is a follower or not
 * @param {*} leaderID 
 * @param {*} followerID 
 * @returns boolean
 */
module.exports.isUserFollowingProfile = async (leaderID, followerID) => {
    const result = await knex(FOLLOWERS_DB_NAME)
                    .where({
                        leader_id: leaderID,
                        follower_id: followerID
                    });

    if (result.length === 1) {
        return true;
    }
    return false;
}

/**
 * Returns followers of a particular profile by limit and offsets.
 * @param {*} profileID 
 */
module.exports.getFollowers = async (profileID, limit = 12, offset = 0) => {
    return await knex(FOLLOWERS_DB_NAME)
                            .join(USERS_DB_NAME, 'follower_id', '=', `${USERS_DB_NAME}.id`)
                            .where('leader_id', '=', profileID)
                            .select('userhandle')
                            .distinct()
                            .limit(limit)
                            .offset(offset)
}