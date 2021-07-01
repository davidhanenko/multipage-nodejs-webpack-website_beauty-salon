const { Router } = require('express')
const router = Router({ mergeParams: true })
const admin = require('../../controllers/admin/admin')
const catchAsync = require('../../utils/catchAsync')
const { isLoggedIn, roleAdmin } = require('../../middleware/admin')
const { check } = require('express-validator')

const popupRoutes = require('./popups')
const aboutRoutes = require('./about')
const servicesRoutes = require('./services')
const pricesRoutes = require('./prices')
const galleryRoutes = require('./gallery')
const contactsRoutes = require('./contacts')

router.use('/popups', popupRoutes)
router.use('/about', aboutRoutes)
router.use('/services', servicesRoutes)
router.use('/prices', pricesRoutes)
router.use('/gallery', galleryRoutes)
router.use('/contacts', contactsRoutes)

//load main admin page
router.get('/', isLoggedIn, catchAsync(admin.main))

// show register form & register logic
router
  .route('/register')
  .get(admin.showRegister)
  .post(
    [
      check('username')
        .isLength({ min: 5 })
        .withMessage('Name should be minimun 5 symbols'),
      check('permission')
        .isLength({ min: 6 })
        .withMessage('Permission code should be minimun 6 symbols')
    ],
    catchAsync(admin.register)
  )

// show login page & login logic
router
  .route('/login')
  .get(catchAsync(admin.showLogin))
  .post(catchAsync(admin.login))

// logout
router.get('/logout', admin.logout)

// title and description
router
  .route('/main')
  .post(isLoggedIn, roleAdmin, catchAsync(admin.createMainPageTags))
  .put(isLoggedIn, roleAdmin, catchAsync(admin.updateMainPageTags))

  // visites counter
router
  .route('/counter')
  .put(isLoggedIn, roleAdmin, catchAsync(admin.resetCounter))

module.exports = router
