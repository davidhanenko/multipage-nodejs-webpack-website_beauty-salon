const { Router } = require('express')
const router = Router({ mergeParams: true })
const {
  addNewUnitPrice,
  editUnitPrice,
  deleteUnitPrice
} = require('../../controllers/admin/prices')
const { isLoggedIn, roleAdmin } = require('../../middleware/admin')
const catchAsync = require('../../utils/catchAsync')
const { check } = require('express-validator')

const priceUnitValidation = [
  check('unitTitle')
    .notEmpty()
    .withMessage('Title is required')
    .not()
    .isNumeric()
    .withMessage('Only string accepted for title field')
    .escape()
    .trim(),
  check('singlePrice')
    .notEmpty()
    .withMessage('Single price is required')
    .isNumeric()
    .withMessage('Only numbers accepted for single price field')
    .escape()
    .trim(),
  check('multiPrice')
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Only numbers accepted for multi price field')
    .escape()
    .trim()
]

//upload new unit price to price block
router.post(
  '/',
  priceUnitValidation,
  isLoggedIn,
  roleAdmin,
  catchAsync(addNewUnitPrice)
)

//edit & delete unit price from service price block
router
  .route('/:unit_id')
  .put(priceUnitValidation, isLoggedIn, roleAdmin, catchAsync(editUnitPrice))
  .delete(isLoggedIn, roleAdmin, catchAsync(deleteUnitPrice))

module.exports = router
