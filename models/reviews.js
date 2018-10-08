//reviews.js
var mongoose = require("mongoose")

var ReviewSchema = new mongoose.Schema({
  title: String,
  description: String,
  movieTitle: String,
  movieId: {type: String, required: true},
  rating: Number
});

var Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
