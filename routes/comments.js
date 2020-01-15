// COMMENTS ROUTES
var express = require("express");
var router = express.Router({mergeParams:true}); 
var campground = require("../models/campground");
var comment = require("../models/comment");
var middleware = require("../middleware");
//added isLoggedIn function as middleware to check 
// if the user is authenticated (Logged In) before he can comment
router.get("/new",middleware.isLoggedIn,(req,res) =>{

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
router.post("/",middleware.isLoggedIn, (req, res) =>{

    //find campground by id
   campground.findById(req.params.id, (err,campground) => {
        if(err){
            req.flash("error","Something went wrong!");
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
                    req.flash("success","Successfully added comment!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
     

    

});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership, (req,res) =>{

    campground.findById(req.params.id,(err,foundCampground)=>{

        if(err || !foundCampground){
            req.flash("error","No campground found!");
            res.redirect("back");
        }

        comment.findById(req.params.comment_id,(err,foundComment)=>{

            if(err){
                res.redirect("back");
            }
            else{
                res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        
            }
        });
    });
});

//COMMENT UPDATE ROUTE
router.put("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{

    //find and update the comment
    //redirect somewhere

    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, (err, updatedComment)=>{

        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});
//COMMENT DELETE ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{

    comment.findByIdAndRemove(req.params.comment_id,(err)=>{

        if(err){
            req.flash("error","Something went wrong!");
            res.redirect("back");
        }
        else{
            req.flash("success","Comment deleted Successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;