var mongoose =  require("mongoose")
var Schema = mongoose.Schema

var Comment = mongoose.model("Comment", {
  title: String,
  content: String,
  reviewId: {
    type: Schema.Types.ObjectId,
    ref: "Review"
  }
})

module.exports = Comment

//Create Comment
module.exports = (app) => {
  app.post("/reviews/comments", (req, res) => {
    Comment.create(req.body).then(comment => {
      res.redirect('/reviews/${comment.reviewId}');
    }).catch((err) => {
      console.log(err.message)
    })
    res.send("reviews comment")
  })
}
