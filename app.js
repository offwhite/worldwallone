const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const app = express()

// middleware
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// routes
const routes = require('./config/routes')

// options
const ENV = require('./config/variables')
const port = 4000

// middleware
app.use(cookieParser())
app.use(session({
  secret: ENV.sessionKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('tiny'))

// static files
app.use(express.static('public'))

// set render engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// connect to db
mongoose.connect('mongodb://localhost/wall_db',{ useNewUrlParser: true })

// load models
const models = path.join(__dirname, 'models')
fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(path.join(models, file)))


// routing
app.use('/', routes);

// start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
