/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
global.jQuery = require('jquery')

import '../../css/errors/errors.css'


$(function () {
  setTimeout(function () {
    $('body').removeClass('loading')
  }, 0)
})
