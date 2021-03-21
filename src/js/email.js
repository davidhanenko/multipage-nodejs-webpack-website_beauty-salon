import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import '../css/email.css'


// show reset button on input change
$('input').on('change', function () {
  $('#reset-email-btn').fadeIn(function(){
    // scale SEND email button
    $('#send-email-btn').addClass('send-email-btn-isready')
  })
  // hide RESET button after click
  $('#reset-email-btn').on('click', function () {
    $('#reset-email-btn').fadeOut('slow', function() {
      // return SEND button to prev condition
        $('#send-email-btn').removeClass('send-email-btn-isready')
    })
  })
})

$('form').on('submit', function () {
  $('#send-email-spinner').show()
})
