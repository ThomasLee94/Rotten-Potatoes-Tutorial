var Review = require("../models/reviews")
var MovieDb = require("moviedb-promise")
var moviedb = new MovieDb("b52d24adafbce5b2208933ddd6c0b636")

module.exports = function(app) {

    app.get("/movies/:movieId/reviews/new", (req, res) => {
        moviedb.movieInfo({id: req.params.movieId})
            .then(movie => {
                console.log(movie)
                res.render("reviews-new", { movieId: req.params.movieId, movie: movie})
        });
    })

    app.post("/movies/:movieId/reviews", (req, res) => {
        console.log(req.body)
    })
}