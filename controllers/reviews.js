var Review = require("../models/reviews")
var MovieDb = require("moviedb-promise")
var moviedb = new MovieDb("b52d24adafbce5b2208933ddd6c0b636")

module.exports = function(app) {
    // SHOW REVIEW
    app.get("/movies/:movieId/reviews/new", (req, res) => {
        Review.find({movieId: req.params.id})
            .then((movie) => {
                
            })
        moviedb.movieInfo({id: req.params.movieId})
            .then(movie => {
                console.log(movie)
                res.render("reviews-new", {movieId: req.params.movieId, movie: movie})
        });
    })

    // CREATE NEW REVIEW
    app.post("/movies/:movieId/reviews", (req, res) => {
        Review.create(req.body)
            .then((review) => {
                console.log("[post] /movies/:movieId/reviews: ", review)
                res.redirect(`/movies/${req.params.movieId}`) //Redirect to reviews/:id
            })
            .catch((err) => {
                console.log(err.message)
            })
    })

    app.put("/movies/:movieId/reviews/:reviewdId", (req, res) => {
        Review.findByIdAndUpdate(req.params.reviewId)
            .then((review) => {
                res.redirect(`/movies/${req.params.movieId}`)
            })
    })
}