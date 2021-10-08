const { Router } = require('express')
const router = Router({ mergeParams: true })
const { emailSend, emailCancel } = require('../controllers/email')
const catchAsync = require('../utils/catchAsync')
const { check } = require('express-validator')
const rateLimiterMiddleware = require('../middleware/limiter')

//email - validate & send
router.post(
  '/',
  rateLimiterMiddleware,
  [
    check('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
    check('phone')
      .if((phone, { req }) => req.body.phone)
      .escape()
      .isLength({ min: 10, max: 11 })
      .withMessage('Please enter valid phone number'),
    check('message')
      .trim()
      .escape()
      .isLength({ min: 10 })
      .withMessage('Please, tell us a little more. Message is too short'),
    check('email')
      .isEmail()
      .withMessage('That email doesn‘t look right')
      .bail()
      .trim()
      .normalizeEmail()
  ],
  catchAsync(emailSend)
)

// cancel email - clear form
router.post('/cancel', catchAsync(emailCancel))

module.exports = router
