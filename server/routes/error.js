const { Router } = require('express')
const router = Router({ mergeParams: true })
const errors = require('../controllers/errors')
const catchAsync = require('../utils/catchAsync')

// show 404
router.get('/404', catchAsync(errors.error))

module.exports = router
