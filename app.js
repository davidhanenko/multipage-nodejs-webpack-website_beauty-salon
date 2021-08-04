if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const path = require('path')
const express = require('express')
const csrf = require('csurf')
const mongoose = require('mongoose')
const webpack = require('webpack')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const helmet = require('helmet')
const crypto = require('crypto')
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo')(session)
const logger = require('./server/utils/logger')

const { renderEJS } = require('./server/middleware/template')
const Admin = require('./server/models/admin')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const isDev = process.env.NODE_ENV === 'development'

const config = require('./webpack.dev.config')
const compiler = webpack(config)

const indexRoutes = require('./server/routes/index')
const serviceRoutes = require('./server/routes/services')
const adminRoutes = require('./server/routes/admin/admin')
const galleryRoutes = require('./server/routes/gallery')
const aboutRoutes = require('./server/routes/about')
const errorRoutes = require('./server/routes/error')

const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const db = mongoose.connection

db.on('error', logger.error.bind(console, 'connection error:'))
db.once('open', () => {
  logger.info('Database connected')
})

const app = express()

app.disable('x-powered-by')

app.use(cookieParser())

const store = new MongoStore({
  url: dbUrl,
  secret: process.env.MONGO_STORE_SEC,
  touchAfter: 24 * 60 * 60
})

store.on('error', function (e) {
  logger.error(`Session store error: ${e}`)
})

// session
app.use(
  session({
    store,
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SEC,
    saveUninitialized: false,
    resave: false,
    unset: 'destroy',
    cookie: {
      // sameSite: 'lax',
      httpOnly: true,
      // secure: true,
      maxAge: 1000 * 60 * 60
    }
  })
)

app.use(flash())

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(mongoSanitize())

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(Admin.authenticate()))
passport.serializeUser(Admin.serializeUser())
passport.deserializeUser(Admin.deserializeUser())

if (isDev) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      serverSideRender: true,
      hot: true,
      writeToDisk: false
    })
  )

  app.use(
    webpackHotMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  )

  app.use(
    config.output.publicPath,
    express.static(path.join(__dirname, './src'))
  )
} else {
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, './views'))
  app.use(express.static(__dirname + '/'))

  app.use((req, res, next) => {
    res.locals.cspNonce = crypto.randomBytes(64).toString('hex')
    next()
  })

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          'default-src': ["'self'"],
          'script-src': [
            "'self'",
            'maps.googleapis.com',
            (req, res) => `'nonce-${res.locals.cspNonce}'`
          ],
          'frame-src': [
            "'self'",
            'www.google.com',
            (req, res) => `'nonce-${res.locals.cspNonce}'`
          ],
          'object-src': [
            "'self'",
            (req, res) => `'nonce-${res.locals.cspNonce}'`
          ],
          'style-src': [
            "'self'",
            'fonts.googleapis.com',
            (req, res) => `'nonce-${res.locals.cspNonce}'`
          ],
          'style-src-elem': [
            "'self'",
            'fonts.googleapis.com',
            (req, res) => `'nonce-${res.locals.cspNonce}'`
          ],
          'font-src': [
            "'self'",
            'fonts.gstatic.com',
            (req, res) => `'nonce-${res.locals.cspNonce}'`
          ],
          'img-src': [
            "'self' data:",
            'https://res.cloudinary.com/dxxcixosf/',
            'maps.gstatic.com *.googleapis.com *.ggpht',
            (req, res) => `'nonce-${res.locals.cspNonce}'`
          ],
          'media-src': [
            "'self' data:",
            'https://res.cloudinary.com/dxxcixosf/',
            (req, res) => `'nonce-${res.locals.cspNonce}'`
          ]
        }
      },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      featurePolicy: {}
    })
  )
}

app.use(csrf())

//add user and alerts to all pages!!!
app.use((req, res, next) => {
  res.locals.admin = req.user
  res.locals.error = req.flash('error')
  res.locals.success = req.flash('success')
  next()
})

app.use('/', indexRoutes)
app.use('/services', serviceRoutes)
app.use('/admin', adminRoutes)
app.use('/gallery', galleryRoutes)
app.use('/about', aboutRoutes)
app.use('/errors', errorRoutes)

// app.get('/', (req, res) => {
//   res.render('index')
// })

//csrf error handler
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  // handle CSRF token errors here
  req.flash('error', 'Forbiden, reload the page and try again')
  logger.warn('403 ' + err)
  res.redirect('back')
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.redirect('/errors/404')
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'

  if (!isDev) {
    logger.error(err.stack.split('\n').slice(0, 5).join('\n'))
    res.status(statusCode).render('errors/errors.ejs')
  } else {
    // render eerror page in dev mode wirh err.stack
    logger.error(err.message)
    renderEJS(res, 'errors/errors.ejs', { err, statusCode })
  }
})

const port = process.env.PORT || 8000
app.listen(port, () => {
  logger.info(`Serving on port ${port}`)
})
