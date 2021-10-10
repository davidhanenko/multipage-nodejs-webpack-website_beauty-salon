
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import '../../css/admin/header.css'

// auto close alerts
window.setTimeout(function () {
  $('.alert-success')
    .fadeTo(500, 0)
    .slideUp(500, function () {
      $(this).remove()
    })
}, 10000)