const Movie = require('../models/movieModel');
const User = require("../models/userModels");
var mongoose = require('mongoose');

// Rate movie
/*
  {
    userId: String,
    movieId: String,
    rating: Integer,
    feedback: String
  }
*/
const rateMovie = (req, res) => {
    const body = req.body;
    console.log(body);
    const rating = parseInt(body.rating);
    if (!body.userId || !body.movieId || !body.rating) {
        return res.status(400).json({
            success: false,
            error: "Bad request!",
        });
    }
    Movie.findOne({ _id: body.movieId }, (err, movie) => {
        if (!movie) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            });
        } else {
            User.findOne({ _id: body.userId }, (err1, user) => {
                if (err1) {
                    return res.status(404).json({
                        err1,
                        message: 'User not found!',
                    });
                }
                // If user already rated this movie -> update rating and feedback
                if (user.ratedMovie.includes(mongoose.Types.ObjectId(body.movieId))) {
                    const index = user.userRating.findIndex(movie => movie.movieId.toString() === body.movieId);
                    const oldRating = user.userRating[index]?.rating;
                    user.userRating[index].rating = parseInt(rating);
                    user.userRating[index].feedback = body.feedback;
                    user.markModified('userRating');

                    // Save the rating to User.userRating
                    user.save().then(() => {
                        movie.totalRateSum += (parseInt(rating) - oldRating);
                        movie.rating = movie.totalRateSum / movie.rateCount;
                        //  Update movie rating
                        movie.save().then(() => {
                            return res.status(200).json({
                                success: true,
                                rating: movie.rating,
                                message: 'Movie rating successfully updated!',
                                user: user,
                            });
                        }).catch(error => {
                            return res.status(500).json({
                                error,
                                message: 'User rating updated but movie rating data can not be updated!',
                            });
                        });
                    }).catch(error => {
                        return res.status(500).json({
                            error,
                            message: 'Can not update user rating!!',
                        });
                    });
                } else {
                    // New rating
                    user.ratedMovie.push(mongoose.Types.ObjectId(body.movieId));
                    user.userRating.push({
                        "title": body.title,
                        "rating": rating,
                        "movieId": mongoose.Types.ObjectId(body.movieId),
                        "feedback": body.feedback
                    });
                    // Insert new record
                    user.save().then(() => {
                        movie.totalRateSum += parseInt(rating)
                        movie.rateCount++;
                        movie.rating = movie.totalRateSum / movie.rateCount;
                        // Update movie rating
                        movie.save().then(() => {
                            return res.status(200).json({
                                success: true,
                                rating: movie.rating,
                                newtotalrating: movie.totalRateSum,
                                message: 'Movie rated successfully!',
                                user: user,
                            });
                        });
                    }).catch(error => {
                        return res.status(500).json({
                            error,
                            message: 'User rating updated bou movie rating data not be updated!',
                        });
                    });
                }
            }).catch(error => {
                return res.status(500).json({
                    error,
                    message: 'Movie could not be updated!',
                });
            });
        }
    });
}

// Search movies (default {title: ""})
/*
    {
        title: String
    }
*/
const search = (req, res) => {
    const body = req.body
    console.log(body);

    const findJson = body.categories?.length > 0 ? {
        // Search title like "string" && search movies contains categories
        title: { $regex: new RegExp(body.title, "i") },
        'details.category': {
            $in: body.categories
        }
    } : {
        // Search title like "string"
        title: { $regex: new RegExp(body.title, "i") },
    };

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Bad request!',
        })
    }

    Movie.find(findJson, (err, movie) => {
        if (!movie) {
            return res.status(404).json({
                err,
                message: `No movie title match as ${body.title}!`,
            });
        } else {
            return res.status(200).json({
                success: true,
                movie: movie?.map((item, index) => { return { movieDetail: item, id: index } }),
                rowCount: movie.length
            });
        }
    });
}

// Search movie by movie's id, gives all movie details and all feedbacks
/*
    {
        movieId: String,
        userId: String
    }
*/
const searchByMovie = (req, res) => {
    const body = req.body;
    console.log(body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "Bad request!"
        });
    } else {
        // Find movie details and all its feedbacks and ratings
        Movie.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(body.movieId),
                },
            },
            {
                $lookup: {
                    from: "190508483_users",
                    localField: "_id",
                    foreignField: "ratedMovie",
                    as: "allFeedback",
                    let: {
                        id: "$_id",
                    },
                    pipeline: [
                        {
                            $match: {
                                "userRating.movieId": mongoose.Types.ObjectId(body.movieId),
                            },
                        },
                    ],
                },
            },
            {
                $unwind: {
                    path: "$allFeedback",
                },
            },
            {
                $unwind: {
                    path: "$allFeedback.userRating",
                },
            },
            {
                $match: {
                    "allFeedback.userRating.movieId": mongoose.Types.ObjectId(body.movieId),
                },
            },
            {
                $project: {
                    _id: "$_id",
                    title: "$title",
                    details: "$details",
                    rating: "$rating",
                    totalRateSum: "$totalRateSum",
                    rateCount: "$rateCount",
                    allFeedback: {
                        feedback:
                            "$allFeedback.userRating.feedback",
                        rating: "$allFeedback.userRating.rating",
                        username: "$allFeedback.username",
                        userId: "$allFeedback._id"
                    },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    title: {
                        $first: "$title",
                    },
                    details: {
                        $first: "$details",
                    },
                    rating: {
                        $first: "$rating",
                    },
                    totalRateSum: {
                        $first: "$totalRateSum",
                    },
                    rateCount: {
                        $first: "$rateCount",
                    },
                    allFeedback: {
                        $push: "$allFeedback",
                    },
                },
            },
        ], (error, movie) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    error: error
                });
            } else {
                return res.status(200).json({
                    success: true,
                    movieDetail: movie.at(0)
                });
            }
        });
    }

}

// Search top 10 rating movies
const searchTopTen = (req, res) => {
    // Search rating > 0, sort by rating desc
    Movie.find({ rating: { $gt: 0 } }).sort({ rating: -1 }).limit(10).then((movie) => {
        if (!movie) {
            return res.status(200).json({
                success: true,
                message: "No movie found!"
            });
        } else {
            return res.status(200).json({
                success: true,
                movies: movie
            });
        }
    }).catch(error => {
        return res.status(404).json({
            success: false,
            error: error,
            message: "No movie found!"
        });
    });
}

const getAllCategories = (req, res) => {
    Movie.aggregate([
        {
            $project: {
                "details.category": 1,
            },
        },
        {
            $group: {
                _id: "$details.category",
            },
        },
        {
            $unwind: {
                path: "$_id",
            },
        },
        {
            $group: {
                _id: null,
                categories: {
                    $addToSet: "$_id",
                },
            },
        },
        {
            $project: {
                _id: 0,
                categories: 1,
            },
        }
    ]).exec((error, result) => {
        if (!error) {
            return res.status(200).json({
                success: true,
                categories: result[0].categories
            });
        } else {
            return res.status(500).json({
                success: false,
                error: "Internal Server Error"
            });
        }
    });
}

module.exports = {
    rateMovie, search, searchByMovie, searchTopTen, getAllCategories
}
