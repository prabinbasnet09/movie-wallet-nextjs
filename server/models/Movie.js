const {model, Schema} = require('mongoose');

const movieSchema = new Schema({
    name: String,
    genre: String,
    yearReleased: Number,
    rating: Number,
    // favoriteMovies: [Object],
})

module.exports = model('Movie', movieSchema)