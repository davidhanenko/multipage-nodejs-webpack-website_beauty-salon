const {Router} = require('express')
const router = Router()
const {services} = require('../controllers/services')
const catchAsync = require('../utils/catchAsync')


// open each service on new page
router.get('/:template', catchAsync(services))

module.exports = router

