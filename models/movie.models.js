const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    original_title: String,
    overview: String,
    poster_path: String,
    movie_type: [String],
    release_date: String,
    rating: Number,
    reviews_count: Number
}, {
    timestamps: true
})

module.exports = mongoose.model('movierealmdb', movieSchema)

