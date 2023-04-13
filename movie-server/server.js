// Using express framework for backend.
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const movieRouter = require('./routes/movieRouter.js')

// userRouter.js which is connected to controller's userController.js so that they can act accordingliy. 
const userRouter = require('./routes/userRouter.js')

const app = express()

// backend server running on 'http://127.0.0.1:3000'.
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017',{ useNewUrlParser: true })
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', () => console.log('Connection failed with - ',err));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/movies', movieRouter)

// all backend work flow(CRUD operations + validations) of signup and login passes through this router link.
app.use('/accounts',userRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))