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

// Restrict other request paths and methods
router.all('/*', (req, res) => {
    return res.status(405).json({
        error: "Method not allowed"
    });
});


module.exports = router;
