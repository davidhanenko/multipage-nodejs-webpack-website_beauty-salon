const { RateLimiterMongo } = require('rate-limiter-flexible')
const mongoose = require('mongoose')
const logger = require('../utils/logger')

const mongoConn = mongoose.connection

const opts = {
  storeClient: mongoConn,
  points: 4, 
  duration: 60 
}

const rateLimiterMongo = new RateLimiterMongo(opts)

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiterMongo
    .consume(req.ip)
    .then(() => {
      next()
    })
    .catch(() => {
      logger.error('Too Many Requests')
      req.flash('error', 'Too many attempts, plese try in a minute')
      return res.redirect('back')
      // res.status(429).send('Too Many Requests')
    })
}

module.exports = rateLimiterMiddleware
