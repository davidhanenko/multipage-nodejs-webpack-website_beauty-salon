const { Router } = require('express')
const router = Router({ mergeParams: true })
const popup = require('../../controllers/admin/popup')
const { isLoggedIn, roleAdmin } = require('../../middleware/admin')
const catchAsync = require('../../utils/catchAsync')

// show popup message page and create new message
router
  .route('/')
  .get(isLoggedIn, catchAsync(popup.showPopupPage))
  .post(isLoggedIn, roleAdmin, catchAsync(popup.createNewMessage))
  .put(isLoggedIn, roleAdmin, catchAsync(popup.removeMsg))

// delete & set as current popup-message
router
  .route('/:id')
  .delete(isLoggedIn, roleAdmin, catchAsync(popup.deleteMsg))
  .put(isLoggedIn, roleAdmin, catchAsync(popup.setMsg))

// show popup message edit page
router
  .route('/popup-message/:id')
  .get(isLoggedIn, catchAsync(popup.showPopupEditPage))
  .put(isLoggedIn, roleAdmin, catchAsync(popup.updateMessage))

module.exports = router
