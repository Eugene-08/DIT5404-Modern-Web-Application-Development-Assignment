const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Movie collection
const Movie = new Schema(
    {
        title: { type: String, required: true },
        details: {
            leadingactor: { type: Array, default: [] },
            director: { type: String, required: true },
            release: { type: String, require: true },
            category: { type: Array, default: [] },
            duration: { type: String, require: false },
            description: { type: String, required: false },
            image: { type: String, require: false },
            imagetype: { type: String, require: false },
            trailer: { type: String, require: false }
        },
        rating: { type: Number, required: true },
        totalratesum: { type: Number, required: true, default: 0 },
        ratecount: { type: Number, required: true, default: 0 },
    },
    { timestamps: true },
)

module.exports = mongoose.model('190508483_movies', Movie)