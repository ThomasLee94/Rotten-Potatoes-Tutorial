var express = require("express");
var app = express();

var exphbs = require("express-handlebars");

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/rotten-potatoes', {useNewUrlParser: true });

var Review = mongoose.model("Review", {
    title: String
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

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.listen(3000, ()=> {
    console.log("App listening on port 3000!")
})
