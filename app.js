//Initialise Express
var express = require("express");
var app = express();

//Initialise Handlebars
var exphbs = require("express-handlebars");

//Initialise Body Parser
var bodyParser =  require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//Initialise Mongoose
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/rotten-potatoes', {useNewUrlParser: true });

var Review = mongoose.model("Review", {
    title: String,
    description: String,
    movieTitle: String,
    rating: Number
})

// var reviews = [
//     {
//         "movieTitle": "The Great Gatsby",
//         "title": "Great Review"
//     },
//     {
//         "movieTitle": "The Shining",
//         "title": "Next Review"
//     }
// ]

//Root rooute
// app.get("/", function(req, res){
//     res.render("home", {msg: "Hello World!"});
//     console.log(res);
// })

//Index route
app.get("/", function(req, res){
    Review.find()
        .then(reviews => {
            res.render("reviews-index", {reviews: reviews});
        })
        .catch(err => {
            console.log(err)
        })
})

app.get("/reviews/new", (req, res) => {
    res.render("reviews-new", {});

})

//Create
app.post("/reviews", (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect("/");
    }).catch((err) => {
        console.log(err.message);
    })
})

app.get("/reviews/:id", (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render("reviews-show", {review: review})
    }).catch((err) => {
        console.log(err.message);
    })
})

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.listen(3000, ()=> {
    console.log("App listening on port 3000!")
})
