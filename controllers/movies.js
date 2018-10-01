// movies.js
var MovieDb = require("moviedb-promise")
var moviedb = new MovieDb("b52d24adafbce5b2208933ddd6c0b636")

module.exports =  function(app) {
    // Show all movies (index route)
    app.get("/", (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render("movies-index", {movies: response.results})
            console.log(response.results)
        }).catch(console.error)
    })

    // Show a single movie + trailer
    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
          if (movie.video) {
            moviedb.movieVideos({ id: req.params.id }).then(videos => {
              movie.trailer_youtube_id = videos.results[0].key
              renderTemplate(movie)
            })
          } else {
            renderTemplate(movie)
          }
      
          function renderTemplate(movie)  {
            res.render('movies-show', { movie: movie });
          }
      
        }).catch(console.error)
      })
    
}