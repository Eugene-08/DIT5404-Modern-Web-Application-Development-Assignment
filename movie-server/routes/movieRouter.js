
//OMDb API key : 92ca64f5
const express = require('express');

const MovieController = require('../controllers/movieController');

const router = express.Router();

router.post('/rateMovie', MovieController.rateMovie);
router.post('/search', MovieController.search);
router.post('/searchByMovie', MovieController.searchByMovie);
router.get('/searchTopTen', MovieController.searchTopTen);

module.exports = router;