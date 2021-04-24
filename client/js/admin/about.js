/* eslint-disable no-undef */
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import '../../css/admin/about.css'



// image upload preview
$(function() {
  $('#image').on('change',function () {
    const file = this.files[0]
    if (file) {
      let reader = new FileReader()
      reader.onload = function (event) {
        $('.imgPreview').attr('src', event.target.result)
      }
      reader.readAsDataURL(file)
    }
  })
})

// edit button and area for our mission
$('.our-mission-button').on('click', function () {
  if ($(this).text().trim() == 'Edit') {
    $(this).text('Close')
  } else {
    $(this).text('Edit')
  }
  $('.our-mission-edit-area').slideToggle('slow')
})


// edit button and area for about
$('.about-button ').on('click', function () {
  if ($(this).text().trim() == 'Edit') {
    $(this).text('Close')
  } else {
    $(this).text('Edit')
  }
  $('.about-edit-area').slideToggle('slow')
})

// edit button and area for about 1st section
$('.about-section1-button').on('click', function () {
  if ($(this).text().trim() == 'Edit') {
    $(this).text('Close')
  } else {
    $(this).text('Edit')
  }
  $('.about-section1-edit-area').slideToggle('slow')
})

// edit button and area for about 2nd section
$('.about-section2-button').on('click', function () {
  if ($(this).text().trim() == 'Edit') {
    $(this).text('Close')
  } else {
    $(this).text('Edit')
  }
  $('.about-section2-edit-area').slideToggle('slow')
})

// edit button and area for about 3rd section
$('.about-section3-button').on('click', function () {
  if ($(this).text().trim() == 'Edit') {
    $(this).text('Close')
  } else {
    $(this).text('Edit')
  }
  $('.about-section3-edit-area').slideToggle('slow')
})

// create new about page form
$('.create-fprm-button').on('click', function () {
  if ($(this).text().trim() == 'Open create form') {
    $(this).text('Close form')
  } else {
    $(this).text('Open create form')
  }
  $('.create-form').slideToggle('slow')
})
