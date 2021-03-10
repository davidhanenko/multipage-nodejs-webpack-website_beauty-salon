const { Router } = require('express')
const router = Router({ mergeParams: true })
const about = require('../../controllers/admin/about')
const multer = require('../../utils/multer')
const { isLoggedIn } = require('../../middleware/admin')
const catchAsync = require('../../utils/catchAsync')
const { check } = require('express-validator')

const aboutInputValidation = [
  check('ourMission')
    .notEmpty()
    .withMessage('Our mission section is required')
    .trim(),
  check('about')
    .notEmpty()
    .withMessage('Main about section is required')
    .trim(),
  check('aboutSection1').trim(),
  check('aboutSection2').trim(),
  check('aboutSection2').trim()
]

router
  .route('/')
  .get(isLoggedIn, catchAsync(about.showAbout))
  .post(
    isLoggedIn,
    multer.upload.single('image'),
    aboutInputValidation,
    catchAsync(about.createAbout)
  )
  .put(
    isLoggedIn,
    multer.upload.single('image'),
    aboutInputValidation,
    catchAsync(about.updateAbout)
  )

module.exports = router
