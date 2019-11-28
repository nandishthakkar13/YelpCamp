//INDEX - show all the campgrounds

var express = require("express");
var router = express.Router();
var campground = require("../models/campground");

router.get("/", (req,res) =>{
    
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
router.post("/",isLoggedIn,(req,res) =>{

   // getting data from the form and adding it th campground Array
  var name =  req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
       username: req.user.username,
       id: req.user._id
   }
   var newCampground = {name: name, image: image, description: description, author:author};

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
router.get("/new",isLoggedIn, (req,res) => {
res.render("campgrounds/new");
});

//SHOW - shows info about one campground
router.get("/:id", (req,res) =>{
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
    
    
    
});

function isLoggedIn(req,res,next){
    //if the user is authenticated then we move on to next thing else 
    //we redirect the user to login first
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
