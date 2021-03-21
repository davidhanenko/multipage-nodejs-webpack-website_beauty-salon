import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

$(function () {
  $('#image-before').on('change', function () {
    const file = this.files[0]
    if (file) {
      let reader = new FileReader()
      reader.onload = function (event) {
        $('.img-before-preview').attr('src', event.target.result)
      }
      reader.readAsDataURL(file)
    }
  })
})

$(function () {
  $('#image-after').on('change', function () {
    const file = this.files[0]
    if (file) {
      let reader = new FileReader()
      reader.onload = function (event) {
        $('.img-after-preview').attr('src', event.target.result)
      }
      reader.readAsDataURL(file)
    }
  })
})
