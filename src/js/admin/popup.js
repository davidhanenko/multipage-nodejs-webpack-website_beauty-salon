import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import '../../css/admin/popup.css'

$('.edit-button').on('click', function () {
  if ($(this).text().trim() == 'Edit text') {
    $(this).text('Close')
  } else {
    $(this).text('Edit text')
  }
  $('.edit-area').slideToggle('slow')
})

$('.create-button').on('click', function () {
  if ($(this).text().trim() == 'Create new') {
    $(this).text('Close')
  } else {
    $(this).text('Create new')
  }
  $('.create-area').slideToggle('slow')
})

const msgText = document.querySelector('.msg-text')
const msgTitle = document.querySelector('.msg-title')
const newMessage = document.querySelector('.new-area')
const newTitle = document.querySelector('.new-area-title')
const msgFontSize = document.querySelector('.msg-font-size')
const msgColor = document.querySelector('.msg-color')
const msgBgColor = document.querySelector('.msg-bg-color')

const fsArr = ['fs-1', 'fs-2', 'fs-3', 'fs-4', 'fs-5']
const msgColorArr = [
  'textDark',
  'textWhite',
  'textRed',
  'textBlue',
  'textGreen',
  'textPurple'
]
const msgBgColorArr = [
  'bgTransparent',
  'bgWhite',
  'bgDWhite',
  'bgLPink',
  'bgLPurple',
  'bgDPurple'
]

// show title
msgTitle.addEventListener(
  'change',
  (e) => (newTitle.textContent = e.target.value)
)
// show text
msgText.addEventListener(
  'change',
  (e) => (newMessage.textContent = e.target.value)
)

// change message font size
msgFontSize.addEventListener('change', (e) => {
  newMessage.classList.remove(...fsArr)
  newMessage.classList.add(e.target.value)
})

// change message text color
msgColor.addEventListener('change', (e) => {
  newMessage.classList.remove(...msgColorArr)
  newMessage.classList.add(e.target.value)
})

// change message background color
msgBgColor.addEventListener('change', (e) => {
  newMessage.classList.remove(...msgBgColorArr)
  newMessage.classList.add(e.target.value)
})
