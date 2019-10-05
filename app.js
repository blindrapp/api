// Dependencies
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
require('dotenv').config()

// App instance
const app = express()
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded())

// Set port
const port = process.env.PORT || 3000

// Routes
const routes = require('./src/routes/index')
app.use('/v1', routes)

// Connect to database
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@blindrdb-tgryd.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.emit('ready')
    console.log('DB connection is ready!')
}).catch(err => console.error(err))

// Start server
app.on('ready', () => {
    app.listen(port, () => console.log(`API running on PORT ${port}`))
})