// COMMENTS ROUTES
var express = require("express");
var router = express.Router({mergeParams:true}); 
var campground = require("../models/campground");
var comment = require("../models/comment");
//added isLoggedIn function as middleware to check 
// if the user is authenticated (Logged In) before he can comment
router.get("/new",isLoggedIn,(req,res) =>{

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
router.post("/",isLoggedIn, (req, res) =>{

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
                    //add username and id to the comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    //according to the new comment Schema and save the comment
                    newComment.save();
                    campground.comments.push(newComment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
     

    

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