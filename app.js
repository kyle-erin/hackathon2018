let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let session = require('express-session')
let mongoose = require('mongoose')
let MongoStore = require('connect-mongo')(session)
require('./models/user')
require('./models/list')

let List = mongoose.model('List')

// Add a list to the DB if there isn't one, maybe later add having multiple lists per user
List.find()
    .then((docs) => {
      if (docs.length === 0) {
        let l = List()
        l.name = 'Shopping List'
        l.save()
      }
      else {
        // Do nothing
      }
    })
    .catch((err) => {
      console.error(err)
    })
// db
mongoose.connect('mongodb://localhost:27017/roommate-shopping')
    .then((res) => {
      console.log('connected successfully')
    })
    .catch((err) => {
      console.error(err)
    })

// routes
let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')

let app = express()

// session
app.use(session({
  secret: 'this is super secret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
