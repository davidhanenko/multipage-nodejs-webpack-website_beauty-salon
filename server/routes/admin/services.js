const multer = require('../../utils/multer')
const { Router } = require('express')
const router = Router({ mergeParams: true })
const services = require('../../controllers/admin/services')
const catchAsync = require('../../utils/catchAsync')
const { isLoggedIn } = require('../../middleware/admin')
const { check } = require('express-validator')

//register image before-after router
const imageBeforeAfterRoutes = require('./images-before-after')
router.use('/:title/imagesb-a', imageBeforeAfterRoutes)

// show service
router.get('/service-new', isLoggedIn, catchAsync(services.showNewService))

//images upload fields for creating new service
let imagesUpload = [
  { name: 'imageMain', maxCount: 1 },
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]

const serviceInputValidation = [
  check('title')
    .isLength({ min: 3 })
    .withMessage('Title required')
    .escape()
    .trim(),
  check('descriptionMain')
    .notEmpty()
    .withMessage('Description for main page is required')
    .trim(),
  check('description1').trim(),
  check('description2').trim(),
  check('description3').trim(),
  check('description4').trim()
]

// create new service
router.post(
  '/',
  [
    check('template')
      .notEmpty()
      .withMessage('Template required')
      .escape()
      .trim()
  ],
  isLoggedIn,
  multer.upload.fields(imagesUpload),
  serviceInputValidation,
  catchAsync(services.createService)
)

//show & edit service
router
  .route('/:title')
  .get(isLoggedIn, catchAsync(services.showService))
  .put(
    isLoggedIn,
    multer.upload.fields(imagesUpload),
    serviceInputValidation,
    catchAsync(services.updateService)
  )
  
  // tags
  router.route('/:title/tags').put(isLoggedIn, catchAsync(services.addTags))

// delete servise
router.delete('/:id', isLoggedIn, catchAsync(services.deleteService))

module.exports = router
