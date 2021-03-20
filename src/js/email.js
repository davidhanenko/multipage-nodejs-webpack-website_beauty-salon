import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import '../css/email.css'

// $('form').on('submit', (e) => {
//   e.preventDefault()

//   let _csrf = $('input[type=hidden]').val()
//   let name = $('#name').val()
//   let phone = $('#phone').val()
//   let email = $('#email').val()
//   let message = $('#message').val()

//   let data = {
//     name,
//     phone,
//     email,
//     message,
//     _csrf
//   }

//   $.post('/email', data, function () {
//     $('#send-email-spinner').show()
//   })

//   $('#name').val('')
//   $('#phone').val('')
//   $('#email').val('')
//   $('#message').val('')

//   window.location.reload()
// })

// $('#cancelEmailBtn').on('click', function () {
//   $('#name').val('')
//   $('#phone').val('')
//   $('#email').val('')
//   $('#message').val('')

// //   window.location.reload()
// })

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
