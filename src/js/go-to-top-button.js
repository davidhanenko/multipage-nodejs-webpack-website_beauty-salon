global.jQuery = require('jquery')

import '../css/go-to-top.css'

// go to top button
const goToTop = document.getElementById('top-button')
let rootElement = document.documentElement

goToTop.addEventListener('click', () => {
  rootElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  goToTop.classList.add('top-button-touch')
 setTimeout(function() {
   goToTop.classList.remove('top-button-touch')
 }, 400)
})

// show and hide go-to-top button on scroll
$(function () {
  $(document).on('scroll', function () {
    if ($(this).scrollTop() < 100) {
      $('.top-button').css('display', 'none')
      $('.top-button').fadeOut('slow')
    } else {
      $('.top-button').css('display', 'block')
      $('.top-button').fadeIn('slow')
    }
  })
})
