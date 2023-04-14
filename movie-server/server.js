// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// APIs for movie
const movieRouter = require('./routes/movieRouter.js');

// APIs for user
const userRouter = require('./routes/userRouter.js');

const app = express();

// Running backend server on 'http://127.0.0.1:3000'.
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/190508483_movieDB', { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', () => console.log('Connection failed with - ', err));

// Hello World
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// For searching movies, rating
app.use('/movies', movieRouter);
// For login, signup
app.use('/accounts', userRouter);

// Listening prot 3000
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));