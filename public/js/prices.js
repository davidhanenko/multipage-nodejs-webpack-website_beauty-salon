import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import '../css/prices.css'

// add active class to one of the price buttoms
$(function () {
  let btn = $('.priceBtn:first')
  $(btn).addClass('priceBtnActive')
})

// add active class to one of the prices
$(function () {
  var tabl = $('.pricesTable:first')
  $(tabl).addClass('prices-active')
})

//price buttons
$('.pricesButtons').on('click', '.priceBtn', function () {
  var i = $('.priceBtn').index(this)
  var arr = $('.priceBtn')

  if (i < $(arr).length / 2) {
    // eslint-disable-next-line no-self-assign
    i = i
  } else {
    i = i - $(arr).length / 2
  }

  var table = $('.pricesTable')[i]

  $('.priceBtn').removeClass('priceBtnActive')
  $('.pricesTable').removeClass('prices-active')
  $(table).addClass('prices-active')
  $(this).addClass('priceBtnActive')
})
