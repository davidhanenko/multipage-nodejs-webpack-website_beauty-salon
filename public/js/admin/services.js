import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import './img-before-after.js'
import '../../css/admin/services.css'

// edit button and edit area for text manipulation
$( document ).on('click', function (event) {
  if ($(this).text().trim() == 'Edit') {
    $(this).text('Close')
  } else {
    $(this).text('Edit')
  }
  $(event.target).closest('.edit').children('.edit-area').slideToggle('slow')
})

// edit button and edit area for text manipulation on service title
$('.title-edit-button').on('click', function () {
  if ($(this).text().trim() == 'Edit') {
    $(this).text('Close')
  } else {
    $(this).text('Edit')
  }
  $('.title-edit-area').slideToggle('slow')
})

// images upload preview
$(function () {
  $('.service-image').on('change', function (event) {
    const file = this.files[0]
    if (file) {
      let reader = new FileReader()
      reader.onload = function (e) {
        $(event.target)
          .parent('.image-choose')
          .children('.image-preview')
          .attr('src', e.target.result)
      }
      reader.readAsDataURL(file)
    }
  })
})

// spinner for uploading before-after images
$('#upload-imagesBA').on('click', function () {
  $('#loading-imagesBA-spinner').show()
})

// spinner for uploading main image
$('#updateBtn').on('click', function () {
  $('#update-spinner').show()
})


// popover
$(function () {
  $('[data-toggle="popover"]').popover()
})

$('.popover-dismiss').popover({
  trigger: 'focus'
})


