const express = require('express');
const MovieController = require('../controllers/movieController');
const router = express.Router();

// Rate selected movie
router.post('/rateMovie', MovieController.rateMovie);
// Search movies with title (default {title: ""})
router.post('/search', MovieController.search);
// Search by selected movie for rating, feedback, and all comments from all users
router.post('/searchByMovie', MovieController.searchByMovie);
// Search top 10 movies
router.get('/searchTopTen', MovieController.searchTopTen);
// Search user's favorite movies
router.post('/searchUserFavourite', MovieController.searchUserFavourite);
module.exports = router;