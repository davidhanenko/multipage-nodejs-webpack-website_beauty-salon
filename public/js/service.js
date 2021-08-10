import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import '../css/service.css'
import '../css/bottom-menu.css'
import './prices'
import './before-after'
import './go-to-top-button'

// spinner
document.onreadystatechange = function () {
  if (document.readyState !== 'complete') {
    document.querySelector('body').style.visibility = 'hidden'
    document.querySelector('#service-loading-spinner').style.visibility =
      'visible'
  } else {
    document.querySelector('#service-loading-spinner').style.display = 'none'
    document.querySelector('body').style.visibility = 'visible'
  }
}

//services dropdown buttons
$('.dropdown-services-buttons').on(
  'click',
  '.dropdown-service-button',
  function () {
    var i = $('.dropdown-service-button').index(this)
    var arr = $('.dropdown-service-button')

    if (i < $(arr).length / 2) {
      // eslint-disable-next-line no-self-assign
      i = i
    } else {
      i = i - $(arr).length / 2
    }

    // var table = $('.pricesTable')[i]

    $('.dropdown-service-button').removeClass('dropdown-service-btn-active')
    // $('.pricesTable').removeClass('prices-active')
    // $(table).addClass('prices-active')
    $(this).addClass('dropdown-service-btn-active')
  }
)