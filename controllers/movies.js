// movies.js
var MovieDb = require("moviedb-promise")
var moviedb = new MovieDb("b52d24adafbce5b2208933ddd6c0b636")

module.exports =  function(app) {
    app.get("/", (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render("movies-index", {movies: response.results})
            console.log(response.results)
        }).catch(console.error)
    })

    app.get('/movies', (req, res) => {
        res.render('movies-index');
    })

    app.get("/movies/:id", (req, res) => {
        moviedb.movieInfo({id: req.params.id}).then(movie => {
            console.log(movie)
            res.render("movies-view", {movie: movie})
        }).catch(console.error)
    })

    app.get("/movie/:id", (req, res) => {
        moviedb.movieInfo({id: req.params.id}).then(movie => {
            res.render("movies-show", {movie: movie});
        })
    }).catch(console.error)
}