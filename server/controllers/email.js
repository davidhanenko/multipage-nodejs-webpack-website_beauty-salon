const axios = require('axios')
const nodemailer = require('nodemailer')
const { validationResult, matchedData } = require('express-validator')
const logger = require('../utils/logger')

module.exports.emailSend = async (req, res) => {
  // expire time for email body data
  // after all inputs will be lost
  req.session.cookie.maxAge = 1000 * 60 * 5
  const errors = validationResult(req)
  //  if we get an error
  if (!errors.isEmpty()) {
    req.session.errors = errors.mapped()

    req.session.data = req.body

    req.flash('error', 'Please check information and message you entered')

    res.redirect('/#contact-form')
    // if no errors, send email throw nodemailer
  } else {
    // Check reCAPTCHA
    const responseKey = req.body['g-recaptcha-response']
    const secretKey = process.env.SECRET_KEY

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${responseKey}`

    axios
      .post(url)
      // .then((response) => response.json())
      .then((googleResponse) => {
        // success respond from Google
        if (googleResponse.data.success == true) {
          // send email
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
            // email message
            const msg = {
              from: email,
              to: process.env.MAIL_TO,
              subject: 'Email from ingoodhandsbyIlona',
              html: `<h2>${name}</h2><h3>${phone}</h3><p>${message}</p>`
            }
            // error on email server or nodemailer
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
          }
        } else {
          // keep input data to prefill the form when showing error
          req.session.data = req.body
          // Error when reCaptcha checkbox not selected
          req.flash('error', `Please select "I'm not a robot" checkbox`)
          res.redirect('/#contact-form')
        }
      })
      .catch((err) => {
        logger.warn('From reCAPTCHA validation:' + err.message)
        req.flash('error', err.message)
      })
  }
}

// cancel email - clear form | it'll clean the form and destroy session with all inputs
module.exports.emailCancel = async (req, res) => {
  req.session.destroy()
  res.redirect('/')
}
