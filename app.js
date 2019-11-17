var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelpcamp");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name:String,
    image: String,
    description: String
});

//setting up a model
var campground = mongoose.model("campground",campgroundSchema);

//creating a new campground object 
/*
campground.create({
    name:"Granite Hill",
    image: "https://www.photosforclass.com/download/pixabay-1867275?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c722f7adc914dc65c_960.jpg&user=Pexels",
    description: "This is a huge granite hill, No Bathrooms. No water. Beautiful granite!"

}, (err, campground) => {
    if (err){
        console.log("error in creating campground!");
    }
    else{
        console.log("Successfully added campground!");
        console.log(campground);
    }
});

*/
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
            res.render("index", {campgrounds:allCampgrounds});
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
res.render("new");
});

//SHOW - shows info about one campground
app.get("/campgrounds/:id", (req,res) =>{
    campground.findById(req.params.id, (err,foundCampground)=>{

            if(err){
                console.log(err);
            }
            else{
    //find the campground with the provided ID
    //render show template with that campground
                res.render("show",{campground:foundCampground});
            }
    });
    
    
    
})


app.listen(3000, () => {
    console.log("server has started!");
});