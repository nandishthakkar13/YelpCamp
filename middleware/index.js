//all the middlewares goes here
var campground = require("../models/campground");
var comment = require("../models/comment");
var middlewareObj ={};

middlewareObj.checkCampgroundOwnership = (req,res,next) =>{
 
    //Is user logged in
if(req.isAuthenticated()){
 //if not redirect 

//otherwise redirect
campground.findById(req.params.id,(err,foundcampground)=>{
    /*
    err is returned when the id given by the user is smaller then what
    mongodb uses so if it doesnt find the id it will give error
    on the other hand if the user passes the same length of id but 
    there is no data assigned to that id then null would be return
    so we need to handle that as well
    so we would check if found the campground or not.
    */
  if(err  || !foundcampground){
      req.flash("error","Campground not found!");
      res.redirect("back");
  }
  else{
       //does user own the campground?
       if(foundcampground.author.id.equals(req.user._id))
       {
     // res.render("campgrounds/edit",{campground:foundcampground});
     next();
      }
      else{
          req.flash("error","you dont have permissions to do that")
          res.redirect("back");
      }
  }
});
}else{
    req.flash("error","You need to be logged in to do that");
 res.redirect("back");
}
}

middlewareObj.checkCommentOwnership = (req,res,next)=>{
 
    //Is user logged in
if(req.isAuthenticated()){
 //if not redirect 

//otherwise redirect
comment.findById(req.params.comment_id,(err,foundcomment)=>{
  if(err || !foundcomment){
      req.flash("error","Comment not found");
      res.redirect("back");
  }
  else{
       //does user own the comment?
       if(foundcomment.author.id.equals(req.user._id))
       {
     // res.render("campgrounds/edit",{campground:foundcampground});
     next();
      }
      else{
          req.flash("error","You dont have the permission to do that!");
          res.redirect("back");
      }
  }
});
}else{
    req.flash("error","you need to be logged in to do that!");
 res.redirect("back");
}
}

middlewareObj.isLoggedIn = (req,res,next)=>{
    //if the user is authenticated then we move on to next thing else 
    //we redirect the user to login first
    if(req.isAuthenticated()){
        return next();
    }

 // this adds up the content to the next request 
 //so this would be add to the login request
 // in other words the content would be added to the login page request
 //so we have to handle that in the login page code
 //you have to write this code before you redirect in order to show on that page
//after using req.flash use res.redirect to render 
//and not res.render
    req.flash("error","You need to be logged in to do that"); 
   
    res.redirect("/login");
}
module.exports = middlewareObj;