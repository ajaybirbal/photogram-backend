# Backend for photogram

Photogram is an instragram clone app. 


## Posts related routes
Routes for handling posts in the app.

### `/post/:id`
GET - Shows the individual post

### `/post/create`
POST - Creates a new post

### `/post/:id`
DELETE - Deletes the particular post

### `/post/:id/like`
GET - Likes a particular post

### `/post/:id/dislike`
DELETE - Removes the like from the particular post

### `/post/user/34?limit=10&offset=0`
GET - Returns the collection of the posts to be shown on profile page.  
Limit - Number of posts to be shown
Offset - Offset the number of posts from the begining

