var express = require("express");
var app = express();

var exphbs =  require("express-handlebars");

var reviews = [
    {   movieTitle: "The Great Gatsby",
        title: "Great Review"
    },
    {   movieTitle: "The Shining",
        title: "Next Review"
    }
]
//Root rooute
// app.get("/", function(req, res){
//     res.render("home", {msg: "Hello World!"});
//     console.log(res);
// })

//Index route
app.get("/", function(req, res){
    res.render("reviews-index", {reviews: reviews});
})

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.listen(3000, ()=> {
    console.log("App listening on port 3000!")
})
