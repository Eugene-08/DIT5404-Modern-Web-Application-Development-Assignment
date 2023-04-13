const Movie = require('../models/movieModel')
const User = require("../models/userModels");

rateMovie = (req, res) => {
    const body = req.body;
    console.log(body);
    const rating = parseInt(body.rating);
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide movie data+rating!!',
        })
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
                if (user.ratedmovie.includes(body.movieid)) {
                    console.log('here update')
                    const index = user.userrating.findIndex(element => element.movieid === body.movieid);
                    const oldrating = user.userrating[index]?.rating;
                    user.userrating[index].rating = parseInt(rating);
                    user.userrating[index].feedback = body.feedback;
                    user.markModified('userrating');

                    user.save().then(() => {
                        movie.totalratesum += (parseInt(rating) - oldrating);
                        movie.rating = movie.totalratesum / movie.ratecount;
                        console.log(movie);
                        movie.save().then(() => {
                            return res.status(200).json({
                                success: true,
                                avgrating: movie.avgrating,
                                message: 'Movie rating successfully updated!!',
                                user: user,
                            })
                        }).catch(error => {
                            return res.status(404).json({
                                error,
                                message: 'user rating updated but movie rating data can not be updated!!',
                            })
                        })
                    }).catch(error => {
                        return res.status(404).json({
                            error,
                            message: 'Can not update use rating!!',
                        })
                    });
                } else {
                    console.log('here new')
                    user.ratedmovie.push(body.movieid);
                    user.userrating.push({
                        "title": body.title,
                        "rating": rating,
                        "movieid": body.movieid,
                        "feedback": body.feedback
                    });
                    user.save().then(() => {
                        movie.totalratesum += parseInt(rating)
                        movie.ratecount++;
                        movie.rating = movie.totalratesum / movie.ratecount;
                        movie.save().then(() => {
                            return res.status(200).json({
                                success: true,
                                avgrating: movie.avgrating,
                                newtotalrating: movie.totalratesum,
                                message: 'Movie successfully ratted!!',
                                user: user,
                            })
                        })
                    }).catch(error => {
                        return res.status(404).json({
                            error,
                            message: 'user rating updated bou movie rating data not be updated!',
                        })
                    })
                }
            }).catch(error => {
                return res.status(404).json({
                    error,
                    message: 'user not found! Movie could not be updated somthing went wrong!!',
                })
            })
        }
    })
}

search = (req, res) => {
    const body = req.body
    console.log(body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide movie title!!',
        })
    }

    // search title like "string"
    Movie.find({ title: { $regex: body.title } }, (err, movie) => {
        if (!movie) {
            return res.status(404).json({
                err,
                message: 'Movie not exist!',
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

searchByMovie = (req, res) => {
    const body = req.body;
    console.log(body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "Body Cannot Be Null"
        });
    } else {

        User.findOne({ _id: body.userid, ratedmovie: body.movieid }, (err, movie) => {
            if (movie) {
                let userrating = movie.userrating.find(rating => rating.movieid == body.movieid);
                return res.status(200).json({
                    success: true,
                    userrating: userrating
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "Movie Not Rated By User Yet!"
                })
            }
        })

    }

}

searchTopTen = (req, res) => {

    // search title like "string"
    Movie.find({ rating: { $gt: 0 } }).sort({ rating: -1 }).limit(10).then((movie) => {
        console.log('here movie', movie)
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
    })
}

module.exports = {
    rateMovie, search, searchByMovie, searchTopTen
}