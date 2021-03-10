/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import '../css/gallery.css'
import './go-to-top-button'
import './header'
import './bottom-menu'

// gallery image view
let images = document.querySelectorAll('#gallery figure')
for (let img of images) {
  img.addEventListener('click', function () {
    this.classList.toggle('expanded')
    gallery.classList.toggle('full')
  })
}
