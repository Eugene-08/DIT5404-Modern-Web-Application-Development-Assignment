const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Here nosql mongodb database is used.
// User is document to store the data of all client who signedUp using Email.
const User = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        ratedmovie: { type: Array, default: [] },
        userrating: { type: Array, default: [] },
        // It should contain object id of movieModel table, user's rating.
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('190508483_users', User)