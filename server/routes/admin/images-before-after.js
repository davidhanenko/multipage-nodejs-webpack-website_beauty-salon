const { Router } = require('express')
const router = Router({ mergeParams: true })
const {addNewImageBA, deleteImageBA} = require('../../controllers/admin/services')
const { isLoggedIn } = require('../../middleware/admin')
const multer = require('../../utils/multer')
const catchAsync = require('../../utils/catchAsync')

// upload new before-after image to service
router.post(
  '/',
  isLoggedIn,
  multer.upload.fields([
    { name: 'imageBefore', maxCount: 1 },
    { name: 'imageAfter', maxCount: 1 }
  ]),
  catchAsync(addNewImageBA)
)

// delete before-after image
router.delete(
  '/:img_id',
  isLoggedIn,
  catchAsync(deleteImageBA)
)

module.exports = router
