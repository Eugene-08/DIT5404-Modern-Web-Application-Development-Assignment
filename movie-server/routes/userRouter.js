const express = require('express')
const UserController = require('../controllers/userController')
const router = express.Router()

router.post('/usersignup', UserController.createUser)
router.post('/login', UserController.login)
router.post('/verifyUser', UserController.verifyUser)
module.exports = router