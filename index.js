const express = require('express')
const app = express()
const bodyParser = require('body-parser');

//-------Middle wares----------------
app.use(bodyParser.json());

//-------Routes----------------
/**
 * User signup router handler
 */
const userSignupRoute = require('./routes/signup')
app.use('/signup', userSignupRoute);

/**
 * Homepage route handler
 */
app.get('/', (req, res) => res.send('Hello World!'))

/**
 * profile page handler
 */
const profileRoute = require('./routes/profile');
app.use('/profile', profileRoute);

/**
 * Post page handler
 * new post submission and individual post page viewer
 */
const postRoute = require('./routes/post')
app.use('/post', postRoute)

//Set port here
const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))