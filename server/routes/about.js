
const { Router } = require('express')
const router = Router()
const {about} = require('../controllers/about')
const catchAsync = require('../utils/catchAsync')



// open about
router.get('/', catchAsync(about))

module.exports = router
