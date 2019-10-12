var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

var campgrounds= [
    {name: "Salmon Creek", image: "https://www.photosforclass.com/download/pixabay-1867275?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c722f7adc914dc65c_960.jpg&user=Pexels"},
    {name: "Granite Hill", image: "https://www.photosforclass.com/download/pixabay-1846142?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c722f7adc914dc65c_960.jpg&user=Pexels"},
    {name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/pixabay-1149402?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c722f79d39f4dc650_960.jpg&user=Free-Photos"},
    {name: "Fire Camp", image: "https://www.photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c722f79d39f4dc650_960.jpg&user=chanwity"},
    {name: "MarshMellow Fire", image: "https://www.photosforclass.com/download/pixabay-1031141?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e0d6424b56ad14f6da8c7dda793f7f1636dfe2564c704c722f79d39f4dc650_960.jpg&user=Free-Photos"}
]
app.get("/", (req,res) =>{
    res.render("landing.ejs");
})

/*Restful convention 
--GET request /campgrounds should saw all the campgrounds
--POST request /campgrounds creates a new campground
--GET request /campgrounds/new will have the form which sents the data to 
                                Post route to create a new campground.
*/
app.get("/campgrounds", (req,res) =>{
    
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds",(req,res) =>{

   // getting data from the form and adding it th campground Array
  var name =  req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   //After adding a new campground to the array 
   //redirect back to campgrounds page

   res.redirect("/campgrounds");
});

//setting up a new form
app.get("/campgrounds/new", (req,res) => {
res.render("new");
});

app.listen(3000, () => {
    console.log("server has started!");
});