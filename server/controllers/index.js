const axios = require('axios')
const Service = require('../models/service')
const Price = require('../models/service-price')
const DisplayContent = require('../models/display-content')
const Contact = require('../models/contact')
const Popup = require('../models/popup')
const MainTag = require('../models/main-tag')
const { renderEJS } = require('../middleware/template')
const nodemailer = require('nodemailer')
const { validationResult, matchedData } = require('express-validator')
const logger = require('../utils/logger')

// index(main page)
module.exports.main = async (req, res) => {
  // logout from admin
  req.logout()
  // tags for SEO
  const mainTags = await MainTag.findOne({})
  // if one of our popup message is selected as current, reveal it on main page
  const popupCurrent = await Popup.findOne({ current: true })
  // all services and prices to reveal on menu and main page
  const services = await Service.find({})
  const prices = await Price.find({}).populate('unitPrice')
  // display mode for prices
  const displayPrices = await DisplayContent.findOne({ content: 'prices' })
  // display mode for about page
  const displayAbout = await DisplayContent.findOne({ content: 'about' })
  // display mode for gallery page
  const displayGallery = await DisplayContent.findOne({ content: 'gallery' })
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
    contacts,
    displayPrices,
    displayAbout,
    displayGallery
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
    const responseKey = req.body['g-recaptcha-response']
    const secretKey = process.env.SECRET_KEY

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${responseKey}`

    axios
      .post(url)
      // .then((response) => response.json())
      .then((googleResponse) => {
        if (googleResponse.data.success == true) {
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
              subject: 'Email from ingoodhandsbyIlona',
              html: `<h2>${name}</h2><h3>${phone}</h3><p>${message}</p>`
            }

            transport.sendMail(msg, function (err) {
              if (err) {
                req.flash('error', 'Error, please try again')
                logger.error(err)
              }
            })

            req.flash('success', 'Thanks for the message! We‘ll be in touch')
            // clear session data/errors after email sent
            req.session.data = null
            req.session.errors = null
            res.redirect('/')
          } catch (err) {
            // add error to logger and show part of it to user throw alert
            logger.error('From nodemail:' + err.message)
            req.flash('error', err.message)
            logger.error(err)
          }
        } else {
          req.session.data = req.body
          console.log('error - checkbox not selected')
          res.redirect('/#contact-form')
        }
      })
      .catch((err) => {
        console.log(err + 'Some error while verify captcha')
      })
  }
}

// cancel email - clear form | it'll clean the form and destroy session with all inputs
module.exports.emailCancel = async (req, res) => {
  req.session.destroy()
  res.redirect('/')
}
