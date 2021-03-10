// before-after images preview
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

$(function () {
  $('#imageBefore').on('change', function () {
    const file = this.files[0]
    if (file) {
      let reader = new FileReader()
      reader.onload = function (event) {
        $('.imgBeforePreview').attr('src', event.target.result)
      }
      reader.readAsDataURL(file)
    }
  })
})

$(function () {
  $('#imageAfter').on('change', function () {
    const file = this.files[0]
    if (file) {
      let reader = new FileReader()
      reader.onload = function (event) {
        $('.imgAfterPreview').attr('src', event.target.result)
      }
      reader.readAsDataURL(file)
    }
  })
})
