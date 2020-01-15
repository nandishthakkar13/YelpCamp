var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var campground = require("./models/campground");
var comment= require("./models/comment");
var seedDB = require("./seeds");
var passport = require("passport");
var localStrategy = require("passport-local");
var  User = require("./models/user");
var methodOverride = require("method-override");
var commentRoute = require("./routes/comments");
var campgroundRoute = require("./routes/campgrounds");
var authRoute = require("./routes/index");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelpcamp");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));
app.use(flash()); 
// seed the database
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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use(authRoute);
app.use("/campgrounds",campgroundRoute);
app.use("/campgrounds/:id/comments",commentRoute);


app.listen(3000, () => {
    console.log("server has started!");
});