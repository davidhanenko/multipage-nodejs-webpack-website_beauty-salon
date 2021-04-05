const bcrypt = require('bcryptjs')
const passport = require('passport')
const { RateLimiterMongo } = require('rate-limiter-flexible')
const mongoose = require('mongoose')
const Popup = require('../../models/popup')
const Service = require('../../models/service')
const About = require('../../models/about')
const Gallery = require('../../models/gallery')
const Price = require('../../models/service-price')
const Contact = require('../../models/contact')
const Admin = require('../../models/admin')
const logger = require('../../utils/logger')
const { renderEJS } = require('../../middleware/template')
const { validationResult } = require('express-validator')

// main page for admin
module.exports.main = async (req, res) => {
  const popupCurrent = await Popup.findOne({ current: true })
  const services = await Service.find({})
  const gallery = await Gallery.find({})
  const about = await About.findOne({}, 'image about')
  const prices = await Price.find({})
  const contacts = await Contact.find({})
  await renderEJS(res, 'admin/admin', {
    csrfToken: req.csrfToken(),
    cspNonce: res.locals.cspNonce,
    popupCurrent,
    services,
    gallery,
    about,
    prices,
    contacts,
    page: 'admin',
    title: 'Admin'
  })
}

// register form
module.exports.showRegister = (req, res) => {
  renderEJS(res, 'admin/login/register', {
    csrfToken: req.csrfToken(),
    cspNonce: res.locals.cspNonce,
    title: 'Register'
  })
}

// register logic
module.exports.register = async (req, res) => {
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    errors = errors.array({ onlyFirstError: true })

    req.flash('error', errors[0].msg)
    res.redirect('/admin/register')
  } else {
    try {
      const { username, password, permission } = req.body

      const admin = new Admin({ username })

      const salt = await bcrypt.genSalt(10)
      admin.permission = await bcrypt.hash(permission, salt)

      Admin.register(admin, password, (err) => {
        if (err) {
          req.flash('error', err.message)
          return res.redirect('back')
        } else {
          req.flash('success', 'Welcome, new ADMIN!')
          res.redirect('/admin')
        }
      })
    } catch (err) {
      logger.error('From admin/register page:' + err.message)
      req.flash('error', err.message)
      res.redirect('back')
    }
  }
}

// show login page
module.exports.showLogin = async (req, res) => {
  const services = await Service.find({})
  const prices = await Price.find({})
  await renderEJS(res, 'admin/login/login', {
    cspNonce: res.locals.cspNonce,
    csrfToken: req.csrfToken(),
    title: 'LogIn',
    page: 'login',
    services,
    prices
  })
}

// signin logic

// =============
const mongoConn = mongoose.connection

const maxWrongAttemptsByIPperMinute = 3
const maxWrongAttemptsByIPperDay = 20

const limiterFastBruteByIP = new RateLimiterMongo({
  storeClient: mongoConn,
  keyPrefix: 'login_fail_ip_per_minute',
  points: maxWrongAttemptsByIPperMinute,
  duration: 60,
  blockDuration: 60 * 2 // Block for 30 minutes, if 3 wrong attempts per 60 seconds
})

const limiterSlowBruteByIP = new RateLimiterMongo({
  storeClient: mongoConn,
  keyPrefix: 'login_fail_ip_per_day',
  points: maxWrongAttemptsByIPperDay,
  duration: 60 * 60 * 24,
  blockDuration: 60 * 60 * 24 // Block for 1 day, if 20 wrong attempts per day
})
// =============

module.exports.login = async (req, res, next) => {
  const ipAddr = req.connection.remoteAddress

  const [resFastByIP, resSlowByIP] = await Promise.all([
    limiterFastBruteByIP.get(ipAddr),
    limiterSlowBruteByIP.get(ipAddr)
  ])

  let retrySecs = 0

  // Check if IP is already blocked
  if (
    resSlowByIP !== null &&
    resSlowByIP.consumedPoints > maxWrongAttemptsByIPperDay
  ) {
    retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1
  } else if (
    resFastByIP !== null &&
    resFastByIP.consumedPoints > maxWrongAttemptsByIPperMinute
  ) {
    retrySecs = Math.round(resFastByIP.msBeforeNext / 1000) || 1
  }

  if (retrySecs > 0) {
    req.flash('error', 'Too many wrong attempts, try again later')
    logger.error('From admin/signin page: To many request: 429')
    // res.status(429).send('Too Many Requests')
    res.set('Retry-After', String(retrySecs))
    res.redirect('back')
  } else {
    passport.authenticate('local', async function (err, user) {
      if (err) {
        return next(err)
      }
      if (!user) {
        try {
          await Promise.all([
            limiterFastBruteByIP.consume(ipAddr),
            limiterSlowBruteByIP.consume(ipAddr)
          ])
          // res.status(400).end('email or password is wrong')
          req.flash('error', 'Wrong user name or password!')
          logger.warn('Wrong attempts on: admin/login')
          return res.redirect('/admin/login')
        } catch (rlRejected) {
          if (rlRejected instanceof Error) {
            throw rlRejected
          } else {
            // res.set(
            //   'Retry-After',
            //   String(Math.round(rlRejected.msBeforeNext / 1000)) || 1
            // )
            // res.status(429).send('Too Many Requests')
            req.flash(
              'Error',
              `Too Many Requests, try after ${
                String(Math.round(rlRejected.msBeforeNext / 1000)) || 1
              } seconds..`
            )
            logger.error('From admin/signin page: Too many requests, 429')
            res.redirect('back')
          }
        }
      } else {
        req.logIn(user, function (err) {
          if (err) {
            return next(err)
          }
          req.flash('success', 'Welcome back!')
          return res.redirect('/admin')
        })
      }
    })(req, res, next)
  }
}

// logout logic
module.exports.logout = (req, res) => {
  req.logOut()
  req.flash('success', 'You are logged out!')
  req.session.destroy()
  res.redirect('/admin/login')
}
