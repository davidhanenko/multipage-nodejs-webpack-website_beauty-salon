const { Router } = require('express')
const router = Router({ mergeParams: true })
const { gallery } = require('../controllers/gallery')
const catchAsync = require('../utils/catchAsync')

router.get('/', catchAsync(gallery))

module.exports = router
