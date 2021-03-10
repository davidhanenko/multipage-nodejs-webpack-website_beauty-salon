const { Router } = require('express')
const router = Router({ mergeParams: true })
const main = require('../controllers/main')
const catchAsync = require('../utils/catchAsync')
// const ExpressError = require('../utils/ExpressError')
// const {getLogout} = require('../middleware/admin')

const emailRoutes = require('./email')
router.use('/email', emailRoutes)


//render all services, prices, contacts and email-send form on main page
router.get('/', catchAsync(main.index))

module.exports = router
