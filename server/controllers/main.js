const Service = require('../models/service')
const Price = require('../models/service-price')
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

  const mainTags = await MainTag.findOne({})
  const popupCurrent = await Popup.findOne({ current: true })
  const services = await Service.find({})
  const prices = await Price.find({}).populate('unitPrice')
  const contacts = await Contact.find({})
  const errors = (await req.session.errors) || {}
  const data = (await req.session.data) || {}

  await renderEJS(res, 'index', {
    csrfToken: req.csrfToken(),
    cspNonce: res.locals.cspNonce,
    page: 'home',
    title: mainTags.title,
    description: mainTags.descriprion,
    data,
    errors,
    popupCurrent,
    services,
    prices,
    contacts
  })
}

// about page
module.exports.about = async (req, res) => {
  const about = await About.findOne({})
  const services = await Service.find({}, 'title template')
  const contacts = await Contact.find({})
  // logout from admin
  req.logout()
  await renderEJS(res, 'about', {
    csrfToken: req.csrfToken(),
    cspNonce: res.locals.cspNonce,
    title: 'Facial & body treatments | About Ilona beauty salon',
    page: 'about',
    about,
    services,
    contacts
  })
}

// send email
module.exports.email = async (req, res) => {
  req.session.cookie.maxAge = 1000 * 60 * 5
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    req.session.errors = errors.mapped()

    req.session.data = req.body

    req.flash('error', 'Please check information and message you entered')

    res.redirect('/#contact-form')
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
      logger.error('From nodemail:' + err.message)
      req.flash('error', err.message)
      logger.error(err)
    }
  }
}

// cancel email - clear form
module.exports.emailCancel = async (req, res) => {
  req.session.destroy()
  res.redirect('/')
}

// gallery
module.exports.gallery = async (req, res) => {
  const services = await Service.find({}, 'title template')
  const gallery = await Gallery.find({})
  // logout from admin
  req.logout()
  await renderEJS(res, 'gallery', {
    services,
    gallery,
    page: 'gallery',
    title: 'Facial & body treatments | Ilona beauty salon | Gallery',
    cspNonce: res.locals.cspNonce
  })
}

// services
module.exports.services = async (req, res) => {
  // logout from admin
  req.logout()
  const service = await Service.findOne({
    template: req.params.template
  }).populate('imageBeforeAfter')
  const services = await Service.find({})
  const prices = await Price.find({}).populate('unitPrice')
  await renderEJS(res, `our_services/${service.template}`, {
    title: `${
      service.titleTag?.charAt(0).toUpperCase() + service.titleTag?.slice(1) || service.title.charAt(0).toUpperCase() + service.title.slice(1)
    } | Facial treatments | Ilona beauty salon | Brooklyn`,
    page: service.title,
    cspNonce: res.locals.cspNonce,
    description: service.descriptionMain,
    service,
    services,
    prices
  })
}
