const mongoose = require('mongoose')
const Schema = mongoose.Schema

// User collection
const User = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        ratedMovie: { type: Array, default: [] },
        userRating: { type: Array, default: [] },
        favourite: { type: Array, default: [] },
    },
    { timestamps: true },
)

module.exports = mongoose.model('190508483_users', User)