import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import '../../css/admin/admin.css'
import '../../css/loaders.css'
import './contacts.js'


// show Read-only alert on Admin page
setTimeout(function () {
  if (document.cookie.split('; ').find((row) => row.startsWith('showOnceA')).split('=')[1] === 'true') {
    // show alert/message
    console.log('modal')
    $('#alertModal').modal('show')
  }
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
