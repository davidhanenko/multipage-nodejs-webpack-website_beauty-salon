import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import '../../css/admin/admin-page/admin.css'
import '../../css/loaders.css'
import './contacts.js'


// show Read-only alert on Admin page
setTimeout(function () {
  // get our cookie
  if (document.cookie.split('; ').find((row) => row.startsWith('showOnceA')).split('=')[1] === 'true') {
    //if message wasn't show yet, show it
    $('#alertModal').modal('show')
  }
  // set cookie to false to not show it again during current session
  document.cookie = 'showOnceA=false'
}, 2000)


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

