const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Movie collection
const Movie = new Schema(
    {
        title: { type: String, required: true },
        details: {
            leadingActor: { type: Array, default: [] },
            director: { type: Array, default: [] },
            release: { type: String, require: false },
            category: { type: Array, default: [] },
            duration: { type: String, require: false },
            description: { type: String, required: false },
            image: { type: String, require: false },
            imageType: { type: String, require: false },
            trailer: { type: String, require: false }
        },
        rating: { type: Number, required: true },
        totalRateSum: { type: Number, required: true, default: 0 },
        rateCount: { type: Number, required: true, default: 0 },
    },
    { timestamps: true },
)

module.exports = mongoose.model('190508483_movies', Movie)