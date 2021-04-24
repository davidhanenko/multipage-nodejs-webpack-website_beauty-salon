
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import './img-before-after.js'
import '../../css/admin/services.css'

// edit button and area for main description
$('.main-description-button').on('click', function () {
  if ($(this).text().trim() == 'Edit') {
    $(this).text('Close')
  } else {
    $(this).text('Edit')
  }
  $('.main-description-edit-area').slideToggle('slow')
})

//edit button and area for title
$('.title-edit-button').on('click', function () {
  if ($(this).text().trim() == 'Edit') {
    $(this).text('Close')
  } else {
    $(this).text('Edit')
  }
  $('.title-edit-area').slideToggle('slow')
})

//edit button and area for first description
$('.description1-edit-button').on('click', function () {
  if ($(this).text().trim() == 'Edit') {
    $(this).text('Close')
  } else {
    $(this).text('Edit')
  }
  $('.description1-edit-area').slideToggle('slow')
})

//edit button and area for second description
$('.description2-edit-button').on('click', function () {
  if ($(this).text().trim() == 'Edit') {
    $(this).text('Close')
  } else {
    $(this).text('Edit')
  }
  $('.description2-edit-area').slideToggle('slow')
})

//edit button and area for 3rd description
$('.description3-edit-button').on('click', function () {
  if ($(this).text().trim() == 'Edit') {
    $(this).text('Close')
  } else {
    $(this).text('Edit')
  }
  $('.description3-edit-area').slideToggle('slow')
})

//edit button and area for 4th description
$('.description4-edit-button').on('click', function () {
  if ($(this).text().trim() == 'Edit') {
    $(this).text('Close')
  } else {
    $(this).text('Edit')
  }
  $('.description4-edit-area').slideToggle('slow')
})

// spinner for uploading before-after images
$('#upload-imagesBA').on('click', function () {
  $('#loading-imagesBA-spinner').show()
})

// spinner for uploading main image
$('#updateBtn').on('click', function () {
  $('#update-spinner').show()
})

// image upload preview
$(function () {
  $('#imageMain').on('change', function () {
    const file = this.files[0]
    if (file) {
      let reader = new FileReader()
      reader.onload = function (event) {
        $('.imgMainPreview').attr('src', event.target.result)
      }
      reader.readAsDataURL(file)
    }
  })
})

$(function () {
  $('#image1').on('change', function () {
    const file = this.files[0]
    if (file) {
      let reader = new FileReader()
      reader.onload = function (event) {
        $('.img1Preview').attr('src', event.target.result)
      }
      reader.readAsDataURL(file)
    }
  })
})

$(function () {
  $('#image2').on('change', function () {
    const file = this.files[0]
    if (file) {
      let reader = new FileReader()
      reader.onload = function (event) {
        $('.img2Preview').attr('src', event.target.result)
      }
      reader.readAsDataURL(file)
    }
  })
})

$(function () {
  $('#image3').on('change', function () {
    const file = this.files[0]
    if (file) {
      let reader = new FileReader()
      reader.onload = function (event) {
        $('.img3Preview').attr('src', event.target.result)
      }
      reader.readAsDataURL(file)
    }
  })
})

$(function () {
  $('#image4').on('change', function () {
    const file = this.files[0]
    if (file) {
      let reader = new FileReader()
      reader.onload = function (event) {
        $('.img4Preview').attr('src', event.target.result)
      }
      reader.readAsDataURL(file)
    }
  })
})

// popover
$(function () {
  $('[data-toggle="popover"]').popover()
})

$('.popover-dismiss').popover({
  trigger: 'focus'
})
