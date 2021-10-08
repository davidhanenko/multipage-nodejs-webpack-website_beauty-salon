const { Router } = require('express')
const router = Router({ mergeParams: true })
const mainPage = require('../controllers/index')
const catchAsync = require('../utils/catchAsync')

const emailRoutes = require('./email')
router.use('/email', emailRoutes)

//render all services, prices, contacts and email-send form on main page
router.get('/', catchAsync(mainPage.main))

module.exports = router
