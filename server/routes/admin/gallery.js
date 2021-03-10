const { Router } = require('express')
const router = Router({ mergeParams: true })
const gallery = require('../../controllers/admin/gallery')
const { isLoggedIn } = require('../../middleware/admin')
const multer = require('../../utils/multer')

const catchAsync = require('../../utils/catchAsync')

// show gallery & upload new photo
router
  .route('/')
  .get(isLoggedIn, catchAsync(gallery.showGallery))
  .post(
    isLoggedIn,
    multer.upload.fields([{ name: 'galleryImage', maxCount: 3 }]),
    catchAsync(gallery.addNewPhoto)
  )

// delete image from gallery
router.delete('/:img_id', isLoggedIn, catchAsync(gallery.deletePhoto))

module.exports = router
