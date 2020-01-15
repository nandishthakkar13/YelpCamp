//INDEX - show all the campgrounds

var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var middleware = require("../middleware");

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
router.post("/",middleware.isLoggedIn,(req,res) =>{

   // getting data from the form and adding it th campground Array
  var name =  req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
       username: req.user.username,
       id: req.user._id
   }
   var price = req.body.price;
   var newCampground = {name: name, image: image, description: description, author:author,price:price};

  //create a new campground and save it to DB
  //campground.create will add the newly created campground or will return an error

    campground.create(newCampground, (err, newlycreatedCampground)=> {
        if(err){
            console.log(err);
        }
        else{
    //After adding a new campground to the Database 
    //redirect back to campgrounds page
            req.flash("success","Successfully added new Campground!");
    res.redirect("/campgrounds");
        }
    });

  
});

//NEW - show form to create new campground
router.get("/new",middleware.isLoggedIn, (req,res) => {
res.render("campgrounds/new");
});

//SHOW - shows info about one campground
router.get("/:id", (req,res) =>{
    campground.findById(req.params.id).populate("comments").exec(function (err,campground){

            if(err || !campground){
                req.flash("error","Campground not found");
                res.redirect("back");
            }  
            else{
    //find the campground with the provided ID
    //render show template with that campground
                res.render("campgrounds/show",{campground:campground});
            }
    });
    
    
    
});

//Edit campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership,(req,res)=>{  
   //otherwise redirect
    campground.findById(req.params.id,(err,foundcampground)=>{
            res.render("campgrounds/edit",{campground:foundcampground});
    });

});


// update campground route
router.put("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
//find and update the correct campground
//redirect somewhere (show page)

campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,updatedCampground)=>{
    if(err){
        res.redirect("/campgrounds");
    }
    else{
        res.redirect("/campgrounds/" + req.params.id);
    }
})
});

//Destroy campground route

router.delete("/:id",middleware.checkCampgroundOwnership,(req,res)=>{

    campground.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
