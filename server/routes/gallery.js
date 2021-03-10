const { Router } = require('express')
const router = Router({ mergeParams: true })
const main = require('../controllers/main')
const catchAsync = require('../utils/catchAsync')

// show gallery
router.get('/', catchAsync(main.gallery))

module.exports = router
