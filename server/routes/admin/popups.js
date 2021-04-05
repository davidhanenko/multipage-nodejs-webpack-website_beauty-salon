const { Router } = require('express')
const router = Router({ mergeParams: true })
const popup = require('../../controllers/admin/popup')
const { isLoggedIn } = require('../../middleware/admin')
const catchAsync = require('../../utils/catchAsync')

// show popup message page and create new message
router
  .route('/')
  .get(isLoggedIn, catchAsync(popup.showPopupPage))
  .post(isLoggedIn, catchAsync(popup.createNewMessage))
  .put(isLoggedIn, catchAsync(popup.removeMsg))

// delete & set as current popup-message
router
  .route('/:id')
  .delete(isLoggedIn, catchAsync(popup.deleteMsg))
  .put(isLoggedIn, catchAsync(popup.setMsg))

// show, edit popup message edit page
router
  .route('/popup-message/:id')
  .get(isLoggedIn, catchAsync(popup.showPopupEditPage))
  .put(isLoggedIn, catchAsync(popup.updateMessage))

module.exports = router
