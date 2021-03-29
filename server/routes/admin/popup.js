const { Router } = require('express')
const router = Router({ mergeParams: true })
const popup = require('../../controllers/admin/popup')
const multer = require('../../utils/multer')
// const { isLoggedIn } = require('../../middleware/admin')
const catchAsync = require('../../utils/catchAsync')
// const { check } = require('express-validator')



router
  .route('/')
  .get(isLoggedIn, catchAsync(popup.showPopupPage))
  .post(isLoggedIn, catchAsync(popup.createNewMessage))


module.exports = router
