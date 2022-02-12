/**
 * Creates a new user
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const { createNewUser } = require('../helpers/users-db');


//Error message generator
const errorMessage = error => {
    return {
        errors: error
    }
}

router.post('/',
    body('email').notEmpty().withMessage("Email can not be empty").isEmail().withMessage("Invalid email"),
    body('desc').trim().escape(),
    body('fname').notEmpty().withMessage("First name can not be empty"),
    body('lname').notEmpty().withMessage("Last name can not be empty"),
    body('password').notEmpty().withMessage("Password can not be empty").isLength({ min: 5 }),
    body('userhandle').notEmpty().withMessage("Choose a user handle"),
    async function(req, res) {

        //Express validators errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errorMessage(errors.array()));
        }

        const { fname, lname, email, password, desc, userhandle } = req.body;
        const insert = await createNewUser(fname, lname, email, password, userhandle, desc);

        //If there is an error? If not, return success message.
        if (insert.errResult != null || insert.errResult != undefined) {

            //Default message
            let message = 'Something went wrong!';

            if (insert.errResult.constraint === 'users_email_unique')
                message = "Email is already registered!"

            if (insert.errResult.constraint === 'userhandle_email_unique')
                message = "User handle is already taken!"

            return res.status(409).json(errorMessage(message))
        }

        if (insert.result != null) {
            return res.send("User created!").status(201)
        }

    });

module.exports = router;