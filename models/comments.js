module.exports = (app) => {
  app.post("/reviews/comments", (req, res) => {
    res.send("reviews comment")
  })
}
