const { Router } = require('express')
const router = Router({ mergeParams: true })
const admin = require('../../controllers/admin/admin')
const catchAsync = require('../../utils/catchAsync')
const { isLoggedIn } = require('../../middleware/admin')
const { check } = require('express-validator')

const pricesRoutes = require('./prices')
const servicesRoutes = require('./services')
const contactsRoutes = require('./contacts')
const galleryRoutes = require('./gallery')
const aboutRoutes = require('./about')

router.use('/prices', pricesRoutes)
router.use('/services', servicesRoutes)
router.use('/contacts', contactsRoutes)
router.use('/gallery', galleryRoutes)
router.use('/about', aboutRoutes)

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

module.exports = router
