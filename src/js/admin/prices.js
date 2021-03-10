/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
global.jQuery = require("jquery");

import '../../css/admin/prices.css';

//price edit buttons
$(".price-edit-button").on("click", function () {
   if ($(this).text().trim() == 'Edit') {
     $(this).text('Close')
   } else {
     $(this).text('Edit')
   }
  $(this).parent().parent().parent().children(".price-edit").fadeToggle("slow");
});

// unit price edit buttons
$(".price-unit-edit-button").on("click", function () {
   if ($(this).text().trim() == 'Edit') {
     $(this).text('Close')
   } else {
     $(this).text('Edit')
   }
  $(this)
    .parent()
    .parent()
    .parent()
    .children(".price-unit-edit")
    .fadeToggle("slow");
});


