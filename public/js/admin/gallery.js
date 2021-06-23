
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import '../../css/admin/gallery.css'


// popover
$(function () {
  $('[data-toggle="popover"]').popover()
})

$('.popover-dismiss').popover({
  trigger: 'focus'
})

//spinner for uploading main image
$('#updateBtn').on('click', function () {
  $('#update-spinner').show()
})
// image upload preview
$(function () {
  $('#galleryImage').on('change', function () {
    let files = this.files
    
    if (files) {
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader()
        reader.onload = function (event) {
          $('.preview').append(
            $('<div>')
              .attr('class', 'col-md-4')
              .append($('<img>').attr('src', event.target.result))
              .append($('<div>&times;</div>').attr('class', 'del'))
          )
          
        // console.log(files)
          $('.del').on('click', function () {
            // $(this).prev().remove()
            $(this).parent().remove()
            
          })
        }
        reader.readAsDataURL(files[i])
      }

      
    }
  })
})
 
