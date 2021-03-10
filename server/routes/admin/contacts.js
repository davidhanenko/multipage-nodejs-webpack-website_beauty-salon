const { Router } = require('express')
const router = Router({ mergeParams: true })
const contacts = require('../../controllers/admin/contacts')
const { isLoggedIn } = require('../../middleware/admin')
const catchAsync = require('../../utils/catchAsync')

// render & upload contacts
router
  .route('/contacts-edit')
  .get(isLoggedIn, catchAsync(contacts.showContacts))
  .post(isLoggedIn, catchAsync(contacts.addContacts))

//edit & delete contacts
router
  .route('/:contact_id')
  .put(isLoggedIn, catchAsync(contacts.editContacts))
  .delete(isLoggedIn, catchAsync(contacts.deleteContact))

module.exports = router
