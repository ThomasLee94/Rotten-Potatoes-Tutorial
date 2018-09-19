//Initialise Express
var express = require("express");
var methodOverride = require("method-override")
var app = express();

//override with POST having ?_method=DELETE or ?_method=input
app.use(methodOverride("_method"))

//Initialise Handlebars
var exphbs = require("express-handlebars");

//Initialise Body Parser
var bodyParser =  require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));



//Initialise Mongoose
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

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

// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
})

// SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})

app.get('/reviews/:id/:edit', (req, res) => {
    Review.findById(req.params.id, function(err,review){
        console.log(review)
        res.render('reviews-edit', {review: review});
    })
})

app.put("/reviews/:id", (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
})

//Delete
app.delete("/reviews/:id", function(req,res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect("/");
    }).catch((err) => {
        console.log(err.message);
    })
})

var routes = require('./controllers/reviews');
routes(app, Review);

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.listen(process.env.PORT || 3000, ()=> {
    console.log("App listening on port 3000!")
})
