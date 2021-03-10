
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import '../../css/admin/contacts.css'
import '../validateForm'

//ADD-NEW button

$('.add-button').on('click', function () {
  if ($(this).text().trim() == 'Add new') {
    $(this).text('Close')
  } else {
    $(this).text('Add new')
  }
  $(this).parent().children('.add-area').slideToggle('slow')
})

//Edit button
$('.edit-button').on('click', function () {
  if ($(this).text().trim() == 'Edit') {
    $(this).text('Close')
  } else {
    $(this).text('Edit')
  }
  $(this).parent().parent().parent().children('.edit-area').slideToggle('slow')
})


