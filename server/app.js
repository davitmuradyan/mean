const express = require('express')
const app = express();
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const { MONGO_URI } = require('./constants/constants')

mongoose.connect(MONGO_URI, { useNewUrlParser: true }, () => {
    console.log(`conected to mongodb`)
})

app.use(passport.initialize())
require('./middlewares/passport')(passport)
app.use(cors())
app.use(bodyParser({extended: true}))
app.use(bodyParser.json())
app.use(authRoutes)

module.exports = app