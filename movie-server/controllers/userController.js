const User = require("../models/userModels");
const Movie = require('../models/movieModel');
const bcrypt = require("bcrypt");
var mongoose = require('mongoose');
// User signup
/*
  {
    username: String,
    password: String
  }
*/
createUser = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Please enter username and password!",
    });
  }
  const user = new User(body);
  if (!user) {
    return res.status(400).json({ success: false, error: err });
  }
  const salt = await bcrypt.genSalt(8);
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then(() => {
    return res.status(200).json({ success: true, message: "User created successfully", user: user });
  }).catch((error) => {
    return res.status(400).json({
      error,
      message: "User not created!",
    });
  });
};

// Verify the username wether it is available
/*
  {
    username: String
  }
*/
verifyUser = async (req, res) => {
  await User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (user == null) {
      return res.status(200).json({ success: true });
    }
    return res.status(200).json({ success: false, message: "Account Exist" });
  }).catch((err) => console.log(err));
};

// Login
/*
  {
    username: String,
    password: String
  }
*/
login = async (req, res) => {
  const body = req.body;
  if (body.username && body.password) {

    const user = await User.findOne({ username: body.username });
    if (user) {
      // Verify username and password
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).json({ success: true, message: "Login Success", user: user });
      } else {
        res.status(400).json({ success: false, message: "Invalid Password", user: null });
      }
    } else {
      res.status(401).json({ success: false, message: "User does not exist", user: null });
    }
  } else {
    res.status(400).json({ success: false, message: "Please enter all require fields", user: null });
  }
};

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

  User.aggregate([
    {
      "$match": {
        _id: mongoose.Types.ObjectId(body.userid),
      },
    },
    {
      "$lookup": {
        from: "190508483_movies",
        localField: "favourite",
        foreignField: "_id",
        as: "userFavouriteMovies"
      },
    },
    {
      "$project": {
        userFavouriteMovies: "$userFavouriteMovies"
      },
    }
  ], (err, userFavouriteMovies) => {
    if (!err) {
      return res.status(200).json({
        success: true,
        userFavouriteMovies
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No user's favourite movies were found!"
      });
    }
  });

}

// Add favourite movie
/**
  {
    movieid: String,
    userid: String
  }
*/
addFavourite = (req, res) => {
  const body = req.body;
  console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Bad request!"
    });
  }

  User.findOne({ _id: body.userId }, (err, user) => {
    if (err) {
      return res.status(404).json({
        success: false,
        error: "User not found!"
      });
    } else {
      if (user.favourite.includes(mongoose.Types.ObjectId(body.movieId))) {
        return res.status(200).json({
          success: false,
          message: "Already added to favourite!"
        });
      } else {
        user.favourite.push(mongoose.Types.ObjectId(body.movieId));
        user.save().then(() => {
          res.status(200).json({
            success: true,
            message: "Add to favourite success"
          });
        }).catch(err => {
          return res.status(500).json({
            success: false,
            error: "Internal Server Error"
          });
        });
      }
    }
  });
}

module.exports = { createUser, login, verifyUser, searchUserFavourite, addFavourite };