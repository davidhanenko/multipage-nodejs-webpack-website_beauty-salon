const Service = require('../models/service')
const Price = require('../models/service-price')
const DisplayPrices = require('../models/display-prices')
const Contact = require('../models/contact')
const About = require('../models/about')
const Popup = require('../models/popup')
const MainTag = require('../models/main-tag')
const Gallery = require('../models/gallery')
const { renderEJS } = require('../middleware/template')
const nodemailer = require('nodemailer')
const { validationResult, matchedData } = require('express-validator')
const logger = require('../utils/logger')

// index(main page)
module.exports.index = async (req, res) => {
  // logout from admin
  req.logout()
  // tags for SEO
  const mainTags = await MainTag.findOne({})
  // if one of our popup message is selected as current, reveal it on main page
  const popupCurrent = await Popup.findOne({ current: true })
  // all services and prices to reveal on menu and main page
  const services = await Service.find({})
  const prices = await Price.find({}).populate('unitPrice')
  const displayPrices = await DisplayPrices.findOne({})
  // contact info
  const contacts = await Contact.find({})
  // errors for email sending
  const errors = (await req.session.errors) || {}
  // input data from email fields
  const data = (await req.session.data) || {}

  // get index.ejs file name from path and render it from views with custom renderEJS function (/server/middleware/template.js)
  await renderEJS(res, 'index', {
    // token to protect from CSRF
    csrfToken: req.csrfToken(),
    // nonce created on our server, to validate sourcew of content
    cspNonce: res.locals.cspNonce,
    page: 'home',
    title: mainTags.title,
    // description of page for SEO, managed from admin pages
    description: mainTags.description,
    data,
    errors,
    popupCurrent,
    services,
    prices,
    displayPrices,
    contacts
  })
}

// about page
module.exports.about = async (req, res) => {
  const mainTags = await MainTag.findOne({})
  const about = await About.findOne({})
  // ervises to reveal into dropdown menu
  const services = await Service.find({}, 'title template')
  // contacts info to reveal into dropdown menu
  const contacts = await Contact.find({})
  // logout from admin if you go back or straight to about page from admin page
  req.logout()
  // // get about.ejs file name from path and render it from views with custom renderEJS function (/server/middleware/template.js)
  await renderEJS(res, 'about', {
    csrfToken: req.csrfToken(),
    cspNonce: res.locals.cspNonce,
    page: 'about',
    title: `${mainTags.title} | About`,
    // description of page for SEO
    description: mainTags.descriprion,
    about,
    services,
    contacts
  })
}

// send email
module.exports.email = async (req, res) => {
  req.session.cookie.maxAge = 1000 * 60 * 50
  const errors = validationResult(req)
  //  if we get an error
  if (!errors.isEmpty()) {
    req.session.errors = errors.mapped()

    req.session.data = req.body

    req.flash('error', 'Please check information and message you entered')

    res.redirect('/#contact-form')
    // if no errors, send email throw nodemailer
  } else {
    try {
      const data = matchedData(req)
      const { name, phone, email, message } = data

      let transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      })

      const msg = {
        from: email,
        to: process.env.MAIL_TO,
        subject: 'Email from ...',
        html: `<h2>${name}</h2><h3>${phone}</h3><p>${message}</p>`
      }

      transport.sendMail(msg, function (err) {
        if (err) {
          req.flash('error', 'Error, please try again')
          logger.error(err)
        }
      })

      req.flash('success', 'Thanks for the message! We‘ll be in touch')

      req.session.data = null
      req.session.errors = null
      res.redirect('/')
    } catch (err) {
      // add error to logger and show part of it to user throw alert
      logger.error('From nodemail:' + err.message)
      req.flash('error', err.message)
      logger.error(err)
    }
  }
}

// cancel email - clear form | it'll clean the form and destroy session with all inputs
module.exports.emailCancel = async (req, res) => {
  req.session.destroy()
  res.redirect('/')
}

// gallery
module.exports.gallery = async (req, res) => {
  // tags for SEO
  const mainTags = await MainTag.findOne({})
  // servises to reveal into dropdown menu
  const services = await Service.find({}, 'title template')

  const gallery = await Gallery.find({})
  // logout from admin if you go back or straight to gallery from admin page
  req.logout()
  // get gallery.ejs file name from path and render it from views with custom renderEJS function (/server/middleware/template.js)
  await renderEJS(res, 'gallery', {
    // cspNonce for Content Security Policy
    cspNonce: res.locals.cspNonce,
    page: 'gallery',
    title: `${mainTags.title} | Gallery`,
    // description of page for SEO
    description: mainTags.descriprion,
    services,
    gallery
  })
}

// services
module.exports.services = async (req, res) => {
  // logout from admin
  req.logout()
  // service choosen by it template name
  const service = await Service.findOne({
    template: req.params.template
  }).populate('imageBeforeAfter')
  // all services for dropdown nav menu
  const services = await Service.find({})
  // all prices to be rendered  current service page
  const prices = await Price.find({}).populate('unitPrice')
  // get current setvice file name from path and render it from views with custom renderEJS function (/server/middleware/template.js)
  await renderEJS(res, `our_services/${service.template}`, {
    title: `${
      // Uppercasing first character for menu and title
      service.titleTag?.charAt(0).toUpperCase() + service.titleTag?.slice(1) ||
      service.title.charAt(0).toUpperCase() + service.title.slice(1)
    } | Facial treatments | Ilona beauty salon | Brooklyn`,
    page: service.title,
    cspNonce: res.locals.cspNonce,
    // description of page for SEO
    description: service.descriptionMain,
    service,
    services,
    prices
  })
}
