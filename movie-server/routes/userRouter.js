const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

// Signup
router.post('/usersignup', UserController.createUser);
// Login
router.post('/login', UserController.login);
// Find exist username
router.post('/verifyUser', UserController.verifyUser);
// Search user favourite movies
router.post('/searchUserFavourite', UserController.searchUserFavourite);
// Add movie to user favourite
router.post('/addFavourite', UserController.addFavourite);

module.exports = router;