# Backend for photogram

Photogram is an instragram clone app. 

## Signup routes

### `/signup`
POST - Registers a new user
Requires following body content to be passed in JSON format: -
`{
    email: 'Email',
    fname: 'First name',
    lname: 'Last name',
    password: 'Password',
    desc: 'Description to be shown on bio page',
    userhandle: 'Account handle'
}`


## Profile routes

### `/profile/:id`
GET - Gets a particuler profile. 

### `/profile/:id/delete`
DELETE - Deletes a particular profile.


## Posts routes
Routes for handling posts in the app.

### `/post/:id`
GET - Shows the individual post

### `/post/create`
POST - Creates a new post
Requires following body content to be passed in JSON format: -
`{
    user_id: 'User Id of the uploader',
    body: 'Body content of the image',
}`

### `/post/:id`
DELETE - Deletes the particular post

### `/post/:id/like`
GET - Likes a particular post
Requires following body content to be passed in JSON format: -
`{
    likerID: 'ID of the liker'
}`

### `/post/:id/dislike`
DELETE - Removes the like from the particular post
Requires following body content to be passed in JSON format: -
`{
    likerID: 'ID of the liker'
}`

### `/post/user/34?limit=10&offset=0`
GET - Returns the collection of the posts to be shown on profile page. 
Limit - Number of posts to be shown
Offset - Offset the number of posts from the begining

This function is primarily used in displaying images on the profile page.
