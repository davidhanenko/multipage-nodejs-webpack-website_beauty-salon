const {Router} = require('express')
const router = Router()
const main = require('../controllers/main')
const catchAsync = require('../utils/catchAsync')


// open each service on new page
router.get('/:template', catchAsync(main.services))

module.exports = router

