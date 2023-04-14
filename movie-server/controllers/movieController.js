const Movie = require('../models/movieModel');
const User = require("../models/userModels");
var mongoose = require('mongoose');

// Rate movie
/*
  {
    userid: String,
    movieid: String,
    rating: Integer,
    feedback: String
  }
*/
rateMovie = (req, res) => {
    const body = req.body;
    console.log(body);
    const rating = parseInt(body.rating);
    if (!body.userid || !body.movieid || !body.rating) {
        return res.status(400).json({
            success: false,
            error: "Bad request!",
        });
    }
    Movie.findOne({ _id: body.movieid }, (err, movie) => {
        if (!movie) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            });
        } else {
            User.findOne({ _id: body.userid }, (err1, user) => {
                if (err1) {
                    return res.status(404).json({
                        err1,
                        message: 'User not found!',
                    })
                }
                // If user already rated this movie -> update rating and feedback
                if (user.ratedmovie.includes(mongoose.Types.ObjectId(body.movieid))) {
                    const index = user.userrating.findIndex(movie =>  movie.movieid.toString() === body.movieid);
                    const oldRating = user.userrating[index]?.rating;
                    user.userrating[index].rating = parseInt(rating);
                    user.userrating[index].feedback = body.feedback;
                    user.markModified('userrating');

                    // Save the rating to User.userrating
                    user.save().then(() => {
                        movie.totalratesum += (parseInt(rating) - oldRating);
                        movie.rating = movie.totalratesum / movie.ratecount;
                        //  Update movie rating
                        movie.save().then(() => {
                            return res.status(200).json({
                                success: true,
                                rating: movie.rating,
                                message: 'Movie rating successfully updated!',
                                user: user,
                            })
                        }).catch(error => {
                            return res.status(500).json({
                                error,
                                message: 'User rating updated but movie rating data can not be updated!',
                            })
                        })
                    }).catch(error => {
                        return res.status(500).json({
                            error,
                            message: 'Can not update user rating!!',
                        })
                    });
                } else {
                    // New rating
                    user.ratedmovie.push(mongoose.Types.ObjectId(body.movieid));
                    user.userrating.push({
                        "title": body.title,
                        "rating": rating,
                        "movieid": mongoose.Types.ObjectId(body.movieid),
                        "feedback": body.feedback
                    });
                    // Insert new record
                    user.save().then(() => {
                        movie.totalratesum += parseInt(rating)
                        movie.ratecount++;
                        movie.rating = movie.totalratesum / movie.ratecount;
                        // Update movie rating
                        movie.save().then(() => {
                            return res.status(200).json({
                                success: true,
                                rating: movie.rating,
                                newtotalrating: movie.totalratesum,
                                message: 'Movie rated successfully!',
                                user: user,
                            })
                        })
                    }).catch(error => {
                        return res.status(500).json({
                            error,
                            message: 'User rating updated bou movie rating data not be updated!',
                        })
                    })
                }
            }).catch(error => {
                return res.status(500).json({
                    error,
                    message: 'Movie could not be updated!',
                })
            })
        }
    })
}

// Search movies (default {title: ""})
/*
    {
        title: String
    }
*/
search = (req, res) => {
    const body = req.body
    console.log(body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Bad request!',
        })
    }

    // Search title like "string"
    Movie.find({ title: { $regex: body.title } }, (err, movie) => {
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
            })
        }
    });
}

// Search movie by movie's id, gives all movie details and all feedbacks
/*
    {
        movieid: String,
        userid: String
    }
*/
searchByMovie = (req, res) => {
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
                    _id: mongoose.Types.ObjectId(body.movieid),
                },
            },
            {
                $lookup: {
                    from: "190508483_users",
                    localField: "_id",
                    foreignField: "ratedmovie",
                    as: "allFeedback",
                    let: {
                        id: "$_id",
                    },
                    pipeline: [
                        {
                            $match: {
                                "userrating.movieid": mongoose.Types.ObjectId(body.movieid),
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
                    path: "$allFeedback.userrating",
                },
            },
            {
                $match: {
                    "allFeedback.userrating.movieid": mongoose.Types.ObjectId(body.movieid),
                },
            },
            {
                $project: {
                    _id: "$_id",
                    title: "$title",
                    details: "$details",
                    rating: "$rating",
                    totalratesum: "$totalratesum",
                    ratecount: "$ratecount",
                    allFeedback: {
                        feedback:
                            "$allFeedback.userrating.feedback",
                        rating: "$allFeedback.userrating.rating",
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
                    totalratesum: {
                        $first: "$totalratesum",
                    },
                    ratecount: {
                        $first: "$ratecount",
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
                })
            }
        })
    }

}

// Search top 10 rating movies
searchTopTen = (req, res) => {
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
        })
    })
}

// Search user favourite movies
/*
    {
        userid: String
    }
*/
searchUserFavourite = (req, res) => {
    const body = req.body;
    console.log(body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "Bad request!"
        });
    }

    Movie.aggregate([
        {
            $match: {

            }
        },
        {
            $lookup: {
                from: "190508483_users",
                localField: "favourite",
                foreignField: "_id",
                as: "userFavouriteMovies"
            }
        },
        { $unwind: "$userFavouriteMovies" },
        {
            $group: {
                "_id": null,
                userFavouriteMovies: "$userFavouriteMovies"
            }
        }
    ]).exec((error, result) => {
        if (!error) {
            return res.status(200).json({
                success: true,
                userFavouriteMovies: result
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "No user's favourite movies were found!"
            });
        }
    });

}

module.exports = {
    rateMovie, search, searchByMovie, searchTopTen, searchUserFavourite
}