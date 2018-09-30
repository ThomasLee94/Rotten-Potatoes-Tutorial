// Name: Thomas J. Lee
// Project: Rotten Potatoes

//Initialise Express
var express = require("express");//What I need to make a web app.
var methodOverride = require("method-override")
var app = express();

//override with POST having ?_method=DELETE or ?_method=input
app.use(methodOverride("_method"))

//Initialise Handlebars
var exphbs = require("express-handlebars");//The connection between express and handlebars(res.render)

//Initialise Body Parser
var bodyParser =  require("body-parser");//Data in form post (req.body) makes it usable through express in routes
app.use(bodyParser.urlencoded({extended: true}));

var Comment = require("./models/comments")
var Review = require("./models/reviews")
var Movies = require("./controllers/movies")
Movies(app)

//Initialise Mongoose
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

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

//Root route
// app.get("/", function(req, res){
//     res.render("home", {msg: "Hello World!"});
//     console.log(res);
// })

//Index route
app.get("/", function(req, res){
    Review.find()
        .then(reviews => {
            res.render("reviews-index", {reviews: reviews});//"reviews-index" is the handlebars template
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
    res.render('reviews-show', { review: review }) //res.render is similar to a return statement
  }).catch((err) => {
    console.log(err.message);
  })
})

// app.get('/reviews/:id', (req, res) => {
//     //Find review
//     Review.findById(req.params.id).then(review => {
//       //Fetch its comments
//       Comment.find({ reviewId: req.params.id}).then(comments => {
//         res.render('reviews-index', {review: review, comments: comments});
//       })

//       }).catch(err => {
//         console.log(err);
//         });
//   });

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

//DELETE
app.delete('/reviews/comments/:id', function (req, res) {
  console.log("DELETE comment")
  Comment.findByIdAndRemove(req.params.id).then((comment) => {
    res.redirect(`/reviews/${comment.reviewId}`);
  }).catch((err) => {
    console.log(err.message);
  })
})

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.listen(process.env.PORT || 3000, ()=> {
    console.log("App listening on port 3000!")
})
