const bcrypt = require('bcryptjs')
const passport = require('passport')
const { RateLimiterMongo } = require('rate-limiter-flexible')
const mongoose = require('mongoose')
const MainTag = require('../../models/main-tag')
const Popup = require('../../models/popup')
const Service = require('../../models/service')
const About = require('../../models/about')
const Gallery = require('../../models/gallery')
const Price = require('../../models/service-price')
const DisplayContent = require('../../models/display-content')
const Contact = require('../../models/contact')
const Admin = require('../../models/admin')
const Visit = require('../../models/visit')
const logger = require('../../utils/logger')
const { siteViewsAdmin } = require('../../utils/visits')

const { renderEJS } = require('../../middleware/template')
const { validationResult } = require('express-validator')

// main admin page
module.exports.main = async (req, res) => {
  const admin = await Admin.findById(req.user.id)
  // increase visits by 1 if readonly role logged in
  if (!admin.isAdmin) {
    siteViewsAdmin()
  }
  // SEO mprovement meta tags, to be edited on admin page
  const mainTags = await MainTag.findOne({})
  // currently selected popup message to be edited on admin page
  const popupCurrent = await Popup.findOne({ current: true })
  // all services, about page, gallery, prices and contact, to be edited from admin page
  const services = await Service.find({})
  const gallery = await Gallery.find({})
  const about = await About.findOne({}, 'image about')
  const prices = await Price.find({})
  const displayContent = await DisplayContent.find({})
  const contacts = await Contact.find({})
  const visits = await Visit.findOne({})
  // render admin page with our renderEJS function instead of native Express method "render"
  await renderEJS(res, 'admin/admin-page/admin', {
    csrfToken: req.csrfToken(),
    cspNonce: res.locals.cspNonce,
    page: 'admin',
    title: 'Admin',
    popupCurrent,
    mainTags,
    services,
    gallery,
    about,
    prices,
    displayContent,
    contacts,
    visits
  })
}

// show register form
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

  // show only first error to user if we got some
  if (!errors.isEmpty()) {
    errors = errors.array({ onlyFirstError: true })
    req.flash('error', errors[0].msg)
    res.redirect('/admin/register')
  } else {
    try {
      // get user inputs
      const { username, password, permission, role } = req.body
      // create new Admin user
      const admin = new Admin({ username })

      // all authorization made with Passport.js
      // but another 'like' password created to ensure permission to make critical changes to the app
      const salt = await bcrypt.genSalt(10)
      admin.permission = await bcrypt.hash(permission, salt)
      // set role to admin if secret match
      // if no - only preview mode, without ability to make POST requests
      if (role === process.env.ADMIN_SECRET) {
        admin.isAdmin = true
      }
      // register new user theow Passport
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
      // add error to the logger and reveal on page throw allert
      logger.error('From admin/register page:' + err.message)
      req.flash('error', err.message)
      res.redirect('back')
    }
  }
}

// show login page
module.exports.showLogin = async (req, res) => {
  // all service and prices to be shown on navbar menu
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
// ============ LIMITER
// use our db connection to count and save incorrect password inpuns
const mongoConn = mongoose.connection

const maxWrongAttemptsByIPperMinute = 3
const maxWrongAttemptsByIPperDay = 20
// set up our limiter:
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
// ============= LIMITER end

module.exports.login = async (req, res, next) => {
  // get ip address of machine
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
          // set cookie to control modal window in read-only role/mode
          res.cookie('showOnceA', 'true', { secure: true })
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

//  Display content on main page
module.exports.dispalayContent = async (req, res) => {
  try {
    // check admin permission pasword to change view mode
    const isMatch = await bcrypt.compare(
      req.body.permission,
      req.user.permission
    )

    if (isMatch) {
      await DisplayContent.findOneAndUpdate(
        { content: req.params.content },
        [{ $set: { display: { $eq: [false, '$display'] } } }],
        { upsert: true }
      )
    } else {
      req.flash('error', 'Wrong permission password! Try again')
    }

    req.flash('success', 'Display Prices Mode updated')
    res.redirect('/admin')
  } catch (err) {
    logger.error('From admin/display-content:' + err.message)
    req.flash('error', err.message)
    res.redirect('back')
  }
}

// title and description create
module.exports.createMainPageTags = async (req, res) => {
  try {
    const { title, description } = req.body
    await MainTag.create({ title, description })
    res.redirect('/admin')
  } catch (err) {
    logger.error('From admin/main-tags create:' + err.message)
    req.flash('error', err.message)
    res.redirect('back')
  }
}

// title and description update
module.exports.updateMainPageTags = async (req, res) => {
  try {
    const mainTags = await MainTag.findOne({})

    mainTags.title = req.body.title
    mainTags.description = req.body.description

    mainTags.save()
    req.flash('success', 'Meta tags for main page updated')
    res.redirect('/admin/#tags')
  } catch (err) {
    logger.error('From admin/main-tags update:' + err.message)
    req.flash('error', err.message)
    res.redirect('back')
  }
}

// reset counter
module.exports.resetCounter = async (req, res) => {
  await Visit.findOneAndUpdate(
    {},
    {
      counter: 0,
      visits: []
    }
  )
  res.redirect('/admin')
}
