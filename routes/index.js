var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/", (req,res) =>{
    res.render("landing.ejs");
})

// Auth Routes
//show register form
router.get("/register",(req,res)=>{

    res.render("register");
});

//handle sign up logic

router.post("/register", (req,res)=>{
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
router.get("/login",(req,res)=>{
    res.render("login");
});

//handle login logic
router.post("/login",passport.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),(req,res)=>{


});

// logout route

router.get("/logout", (req,res)=>{

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

module.exports = router;