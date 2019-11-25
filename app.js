var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment= require("./models/comment");
var seedDB = require("./seeds");
var passport = require("passport");
var localStrategy = require("passport-local");
var  User = require("./models/user");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelpcamp");


app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

//passport configuration
app.use(require("express-session")({
    secret: "once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
})

app.get("/", (req,res) =>{
    res.render("landing.ejs");
})


//INDEX - show all the campgrounds
app.get("/campgrounds", (req,res) =>{
    
    //get all the campgrounds from database and render on the page
    //campground.find will either give error or return all the campgrounds
    campground.find({}, (err, allCampgrounds) =>{
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
        });
    
});

//CREATE - add new campground to db
app.post("/campgrounds",(req,res) =>{

   // getting data from the form and adding it th campground Array
  var name =  req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var newCampground = {name: name, image: image, description: description};

  //create a new campground and save it to DB
  //campground.create will add the newly created campground or will return an error

    campground.create(newCampground, (err, newlycreatedCampground)=> {
        if(err){
            console.log(err);
        }
        else{
    //After adding a new campground to the Database 
    //redirect back to campgrounds page

    res.redirect("/campgrounds");
        }
    });

  
});

//NEW - show form to create new campground
app.get("/campgrounds/new", (req,res) => {
res.render("campgrounds/new");
});

//SHOW - shows info about one campground
app.get("/campgrounds/:id", (req,res) =>{
    campground.findById(req.params.id).populate("comments").exec(function (err,foundCampground){

            if(err){
                console.log(err);
            }  
            else{
    //find the campground with the provided ID
    //render show template with that campground
                res.render("campgrounds/show",{campground:foundCampground});
            }
    });
    
    
    
})


//  ================================
// COMMENTS ROUTES

//added isLoggedIn function as middleware to check 
// if the user is authenticated (Logged In) before he can comment
app.get("/campgrounds/:id/comments/new",isLoggedIn,(req,res) =>{

    //find campground by id
    campground.findById(req.params.id, (err,campground) => {
        if(err){
            console.log(err);
        }
        else{
            //if we get campground from the database we would render it
            res.render("comments/new",{campground:campground});
        }
    })
   
});

//adding middleware function isLoggedIn to authenticate user
// you have to check in the post route too because a user can fire a 
// comment using sql injection without logging in 
app.post("/campgrounds/:id/comments",isLoggedIn, (req, res) =>{

    //find campground by id
   campground.findById(req.params.id, (err,campground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{

            comment.create(req.body.comment, (err, newComment) =>{
                if(err){
                    console.log(err);
                }
        
                else{
                    
                    campground.comments.push(newComment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
     

    

});

//  ================================
// Auth Routes

//show register form
app.get("/register",(req,res)=>{

    res.render("register");
});

//handle sign up logic

app.post("/register", (req,res)=>{
    var newUser = new User({username: req.body.username});
        User.register(newUser,req.body.password, (err,newlyCreatedUser)=> {
                if(err){
                    console.log(err);
                  return res.render("register");
                }
                passport.authenticate("local")(req,res,()=>{
                    res.redirect("/campgrounds");
                    
                });
        });
});

//show login form
app.get("/login",(req,res)=>{
    res.render("login");
});

//handle login logic
app.post("/login",passport.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),(req,res)=>{


});

// logout route

app.get("/logout", (req,res)=>{

    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    //if the user is authenticated then we move on to next thing else 
    //we redirect the user to login first
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, () => {
    console.log("server has started!");
});