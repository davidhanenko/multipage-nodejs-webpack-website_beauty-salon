import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import '../../css/admin/admin.css'
import '../../css/loaders.css'
import './contacts.js'

// show Read-only alert on Admin page
setTimeout(function () {
  // if message show first time and no 'showOnceAdmin' - set 'showOnceAdmin' item to true
  if (
    !localStorage.getItem('showOnceAdmin') ||
    localStorage.getItem('showOnceAdmin') === 'true'
  ) {
    // show alert/message
    $('#alertModal').modal('show')
    // set 'showOnceAdmin' to false. Don't show message after reloading of main page
    localStorage.setItem('showOnceAdmin', 'false')
  }
}, 2000)

// return alert to the page again(after 15 mins from last reload)
setTimeout(function () {
  localStorage.setItem('showOnceAdmin', 'true')
}, 1000 * 60 * 15)


// popovers
$(function () {
  $('[data-toggle="popover"]').popover()
})

$('.popover-dismiss').popover({
  trigger: 'focus'
})

// spinner for creating tags
$('#create-tags').on('click', function () {
  $('#create-tags-spinner').show()
})

// spinner for updating tags
$('#update-tags').on('click', function () {
  $('#update-tags-spinner').show()
})
