/**
 * File to handle profile routes.
 * 
 * Routes: -
 * /profile/:id - Profile page
 * /profile/:id/delete - For deleting a particular profile
 * 
 * ---To do---------
 * /profile/:id/follow - For following a particular profile
 * /profile/:id/unfollow - For unfollowing a particular profile
 * 
 */

const express = require('express');
const { getUserPosts, getUserPostCount } = require('../helpers/posts-db');
const { getUserInfo, deleteUser } = require('../helpers/users-db');
const router = express.Router();

/**
 * Profile page route handler. Returns profile by user id.
 */
router.get('/:id', async (req, res) => {
    const userID = req.params.id;

    //Get the profile info from the db
    const profile = await getUserInfo(userID);
    
    if (profile.length === 0) {
        return res.json({
            errors: "No user found!"
        })
    }

    //Get last 9 created post ordered by creation date in DESC order. Also, returns total post count
    const posts = await getUserPosts(userID)

    return res.json({
        profile: profile[0],
        posts: posts.posts,
        postCount: posts.postCount
    }).status(201);
})

/**
 * Deletes profile from the db
 */
router.delete('/:id/delete', async(req, res) => {
    const userID = req.params.id;

    //Json response generator
    const setDeletedStatus = status => {
        return{
            deleted: status
        }
    }

    const { result, error }= await deleteUser(userID)

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

module.exports = router;
