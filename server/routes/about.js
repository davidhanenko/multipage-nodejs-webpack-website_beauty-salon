
const { Router } = require('express')
const router = Router()
const main = require('../controllers/main')
const catchAsync = require('../utils/catchAsync')



// open about
router.get('/', catchAsync(main.about))

module.exports = router
