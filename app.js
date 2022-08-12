var createError = require('http-errors')
var express = require('express')
var path = require('path')
var fs = require('fs')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const session = require('express-session')
const RedisStore = require('connect-redis')(session)

var blogRouter = require('./routes/blog')
var userRouter = require('./routes/user')

var app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境 / 测试环境
  app.use(logger('dev'))
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(
    logger('combined', {
      stream: writeStream
    })
  )
}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(
  session({
    resave: false, // 添加 resave 选项
    saveUninitialized: true, // 添加 saveUninitialized 选项
    secret: 'WJiol_#87834',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
  })
)

app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'dev' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
