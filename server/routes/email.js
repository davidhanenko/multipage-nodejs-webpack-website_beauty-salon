const { Router } = require('express')
const router = Router({ mergeParams: true })
const { email, emailCancel } = require('../controllers/main')
const catchAsync = require('../utils/catchAsync')
const { check } = require('express-validator')
const rateLimiterMiddleware = require('../middleware/limiter')

//email - validate & send
router.post(
  '/',
  rateLimiterMiddleware,
  [
    check('name').isLength({ min: 1 }).withMessage('Name is required').trim(),
    check('phone')
      .if((phone, { req }) => req.body.phone)
      .escape()
      .isLength({ min: 10, max: 11 })
      .withMessage('Please enter valid phone number'),
    check('message')
      .escape()
      .isLength({ min: 1 })
      .withMessage('Message is required')
      .trim(),
    check('email')
      .isEmail()
      .withMessage('That email doesn‘t look right')
      .bail()
      .trim()
      .normalizeEmail()
  ],
  catchAsync(email)
)

// cancel email - clear form
router.post('/cancel', catchAsync(emailCancel))

module.exports = router
