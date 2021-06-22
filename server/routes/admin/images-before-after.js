const { Router } = require('express')
const router = Router({ mergeParams: true })
const {
  addNewImageBA,
  deleteImageBA
} = require('../../controllers/admin/services')
const { isLoggedIn, roleAdmin } = require('../../middleware/admin')
const multer = require('../../utils/multer')
const catchAsync = require('../../utils/catchAsync')

// upload new before-after image to service
router.post(
  '/',
  isLoggedIn, roleAdmin,
  multer.upload.fields([
    { name: 'image-before', maxCount: 1 },
    { name: 'image-after', maxCount: 1 }
  ]),
  catchAsync(addNewImageBA)
)

// delete before-after image
router.delete('/:img_id', isLoggedIn, roleAdmin, catchAsync(deleteImageBA))

module.exports = router
