const express = require('express')
const app = express()

// middleware
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// routes
const indexRouter = require('./routes/index')
const strokeRouter = require('./routes/stroke')

// options
const port = 4000

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(logger('tiny'))

// routing
app.use('/', indexRouter);
app.use('/stroke', strokeRouter);

// start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
