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
  if(err){
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
          res.redirect("back");
      }
  }
});
}else{
 res.redirect("back");
}
}

middlewareObj.checkCommentOwnership = (req,res,next)=>{
 
    //Is user logged in
if(req.isAuthenticated()){
 //if not redirect 

//otherwise redirect
comment.findById(req.params.comment_id,(err,foundcomment)=>{
  if(err){
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
          res.redirect("back");
      }
  }
});
}else{
 res.redirect("back");
}
}

middlewareObj.isLoggedIn = (req,res,next)=>{
    //if the user is authenticated then we move on to next thing else 
    //we redirect the user to login first
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = middlewareObj;