/***
 * File to handle posts routes.
 * 
 * 
 * /post/create - Creates a new post
 * /post/:id - Get - Shows the individual post
 * /post/:id - Delete - Deletes the particular post
 * 
 * /post/:id/like - Likes a particular post
 * /post/:id/dislike - Dislikes a particular post
 * 
 * -----Profile page functions
 * /post/user/34?limit=10&offset=0 - Shows the post to be shown on profile page
 * 
 */
const express = require('express');
const { body, validationResult } = require('express-validator');
const { route } = require('express/lib/router');
const { likePost, getPostLikesCount, dislikePost, getPostLikers } = require('../helpers/like-db');
const { createNewPost, getSinglePost, getUserPosts, deletePost } = require('../helpers/posts-db');
const router = express.Router();

/**
 * Route to create a new post
 */
router.post('/create',
    body('url').notEmpty().withMessage("Please upload an image"),
    body('user_id').notEmpty().withMessage("You need to be logged in"),
    body('body').trim().escape(),
    async (req, res) => {

        //Express validators errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        //---Add image uploading and processing functionality later

        const { url, body, user_id } = req.body;
        const insert = await createNewPost(url, body, user_id);

        if (insert.errResult != null || insert.errResult != undefined) {
            return res.json({ errors: "Something went wrong" }).status(401);
        }

        if (insert.result != null) {
            return res.send("Post created!").status(201)
        }
    }
)

/**
 * Returns a single post from the database
 */
router.get('/:id', async (req, res) => {
    const postID = Number(req.params.id);

    const result = await getSinglePost(postID);
    const numberOfLikes = await getPostLikesCount(postID);

    return res.json({
        postData: result,
        likes: numberOfLikes[0]?.count || 0
    }).status(200);
})

/**
 * Returns array of posts sorted by created date in descending order.
 * Limit and offset can be applied.
 * Format: /post/user/34?limit=10&offset=0
 */
router.get('/user/:id', async (req, res) => {
    const userID = req.params.id;
    const limit = req.query.limit || 9;
    const offset = req.query.offset || 0;

    const result = await getUserPosts(userID, limit, offset);
    return res.json(result).status(200);
})

/**
 * Deletes the particular posts from the database.
 */
router.delete('/:id', async (req, res) => {
    const postID = req.params.id;

    //Json response generator
    const setDeletedStatus = status => {
        return {
            deleted: status
        }
    }

    const { result, error } = await deletePost(postID);

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

//------ Likes / Dislikes handler
/**
 * Route for liking a post
 */
router.get('/:id/like', async (req, res) => {
    const postID = req.params.id;
    //Json parameters
    const likerID = req.body.likerID;
    const { result, error } = await likePost(postID, likerID);

    if (error != null || error != undefined) {
        return res.json({ liked: false }).status(401);
    }

    if (result != null) {
        return res.json({ liked: true }).status(401);
    }
})


/**
 * Route for disliking a post
 */
router.delete('/:id/dislike', async (req, res) => {
    const postID = req.params.id;
    //Json parameters
    const likerID = req.body.likerID;

    //JSON response
    //Json response generator
    const setDeletedStatus = status => {
        return {
            deleted: status
        }
    }

    const { result, error } = await dislikePost(postID, likerID);

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
 * Returns the list of the likers of the post
 */
router.get('/:id/likers', async(req, res) => {
    const postID = req.params.id;
    const limit = req.query.limit || 9;
    const offset = req.query.offset || 0;

    const result = await getPostLikers(postID, limit, offset);
    
    return res.json(result).status(200);
})

module.exports = router;