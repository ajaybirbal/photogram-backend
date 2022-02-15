/**
 * File to handle profile routes.
 * 
 * Routes: -
 * /profile/:id - Profile page
 * /profile/:id/delete - For deleting a particular profile
 * /profile/:id/follow - For following a particular profile
 * /profile/:id/unfollow - For unfollowing a particular profile
 * 
 */

const express = require('express');
const { getUserPosts } = require('../helpers/posts-db');
const { getUserInfo, deleteUser } = require('../helpers/users-db');
const { addNewFollower, unfollowProfile, countFollowers, isUserFollowingProfile, getFollowers } = require('../helpers/followers-db')
const router = express.Router();

/**
 * Profile page route handler. Returns profile by user id.
 */
router.get('/:id', async (req, res) => {
    const profileID = req.params.id;
    const userID = req.body.user_id;

    //Get the profile info from the db
    const profile = await getUserInfo(profileID);

    if (profile.length === 0) {
        return res.json({
            errors: "No user found!"
        })
    }

    //Get last 9 created post ordered by creation date in DESC order. Also, returns total post count
    const posts = await getUserPosts(profileID)
    const numberOfFollowers = await countFollowers(profileID);

    return res.json({
        profile_data: profile[0],
        posts: posts.posts,
        postsCount: posts.postCount,
        followersCount: numberOfFollowers[0].count,
        followedByUser: await isUserFollowingProfile(profileID, userID) || false
    }).status(200);
})

/**
 * Deletes profile from the db
 */
router.delete('/:id/delete', async (req, res) => {
    const profileID = req.params.id;

    //Json response generator
    const setDeletedStatus = status => {
        return {
            deleted: status
        }
    }

    const { result, error } = await deleteUser(profileID)

    if (result && result === 1) {
        return res.json(setDeletedStatus(true)).status(200)
    }

    //Item is already deleted
    if (result != null && result != undefined && result === 0) {
        return res.json(setDeletedStatus(false)).status(200)
    }

    if (error) {
        return res.json(setDeletedStatus(false)).status(200)
    }
})

/**
 * Route to add a followerID to a leaderID
 */
router.post('/:id/follow', async (req, res) => {
    const leaderID = req.params.id;
    const followerID = req.body.user_id;

    //JSON message to be returned
    const successJSONMessage = status => { return { success: status } }

    const result = await addNewFollower(leaderID, followerID);

    if (result?.rowCount && result?.rowCount === 1) {
        return res.json(successJSONMessage(true)).status(200);
    }
    return res.json(successJSONMessage(false));
})

/**
 * Route to unfollow a profile.
 */
router.post('/:id/unfollow', async (req, res) => {
    const leaderID = req.params.id;
    const followerID = req.body.user_id;

    //JSON message to be returned
    const successJSONMessage = status => { return { success: status } }

    const result = await unfollowProfile(leaderID, followerID);

    if (result && result === 1) {
        return res.json(successJSONMessage(true)).status(200);
    }
    return res.json(successJSONMessage(false));
})


/**
 * Get followers list by limit and offsets.
 */
router.get('/:id/followers', async (req, res) => {
    const profileID = req.params.id;
    const limit = req.query.limit || 9;
    const offset = req.query.offset || 0;

    const result = await getFollowers(profileID, limit, offset);
    return res.json(result).status(200);
})
module.exports = router;
