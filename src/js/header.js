/* eslint-disable no-undef */
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import '../css/header.css'

// Scrolled for navbar
$(window).on('scroll', function () {
  var $nav = $('#mainNavbar')
  $nav.toggleClass('scrolled', $(this).scrollTop() > 90)
})

// //scroll for dropdown background
$(function () {
  $(window).on('scroll', function () {
    var $dropdown = $('#drop')
    $dropdown.toggleClass('dropdownScrolled', $(this).scrollTop() > 90)
  })
})

// add bg to navbar on toggle
$('.navbar-toggler').on('click', function () {
  $('.navbar').toggleClass('navToggled')
  // $('.navbar-collapse').toggleClass('navToggled')
})
