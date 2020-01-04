# YelpCamp
* Add Landing Page
* Add Camgrounds Page that lists all campgrounds

Each Campground has:
* Name
* Image

# Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

# Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

# Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

# Style the Navbar and Form
* Add a navbar to all the templates
* Style the new campground form

// Made first git commit

# Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes


# Show Page
* Review the RESTful routes
    /*Restful convention 
    INDEX  route   --GET  request /campgrounds        displays a list of all the campgrounds
    NEW    route   --GET  request /campgrounds/new    displays form to make a new dog                                                   
    CREATE route   --POST request /campgrounds        Add new dog to DB
    SHOW   route   --GET  request /campgrounds/:id    Shows info about one campground
*/

* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template
* 

# Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly
 

# Add Seeds File
* Add a seeds.j file
* Run the seeds file everytime the server starts

# Add the Comment Model
* Make our errors go away!
* Display comments on campgroound show page

# Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

# Style Show Page
* Add sidebar to show page
* Display comments nicely

# Style Show Page
* Add sidebar to show page
* Display comments nicely

# Finish Styling Show Page
* Add public directory
* Add custom stylesheet

# Add User Model
* Install all packages needed for auth
* Define User Model

# Auth Pt-2 
* Configure Passport
* Add register routes
* Add register template

# Auth Pt-3 - Login
* Add Login routes
* Add Login template

# Auth Pt-4 Logout/ Navbar
* Add Logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar


# Auth Pt-5 Show/hide links
* Show/hide auth links in navbar correctly

# Refactor the routes
* Use Express router to reorganize all routes

# Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

# Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix set problem

# Deleting Campgrounds
* Add Destroy Route
* Add Delete Button

# Authorization Part:1 Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons


# Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

# Deleting Comments
* Add Destroy route
* Add Delete button

# Authorization Part:2 Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor middleware



