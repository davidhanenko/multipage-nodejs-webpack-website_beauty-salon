import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import '../../css/admin/popup.css'

const msgText = document.querySelector('.msg-text')
const msgTitle = document.querySelector('.msg-title')
const newArea = document.querySelector('.new-edit-area')
const newMessage = document.querySelector('.area-text')
const newTitle = document.querySelector('.area-title')
const titleFontSize = document.querySelector('.title-font-size')
const titleColor = document.querySelector('.title-color')
const titlePosition = document.querySelector('.title-position')
const msgFontSize = document.querySelector('.msg-font-size')
const msgColor = document.querySelector('.msg-color')
const msgBgColor = document.querySelector('.msg-bg-color')

const fsArr = ['fs-1', 'fs-2', 'fs-3', 'fs-4', 'fs-5']
const textColorArr = [
  'text-dark',
  'text-white',
  'text-red',
  'text-blue',
  'text-green',
  'text-purple'
]
const msgBgColorArr = [
  'bg-white',
  'bg-darker-white',
  'bg-ligth-pink',
  'bg-light-purple',
  'bg-darker-purple'
]

const titlePositionsArr = ['title-left', 'title-center', 'title-right']

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

// change new title font size
titleFontSize.addEventListener('change', (e) => {
  newTitle.classList.remove(...fsArr)
  newTitle.classList.add(e.target.value)
})

// change new title text color
titleColor.addEventListener('change', (e) => {
  newTitle.classList.remove(...textColorArr)
  newTitle.classList.add(e.target.value)
})

// change new message title position
titlePosition.addEventListener('change', (e) => {
  newTitle.classList.remove(...titlePositionsArr)
  newTitle.classList.add(e.target.value)
})

// change new message font size
msgFontSize.addEventListener('change', (e) => {
  newMessage.classList.remove(...fsArr)
  newMessage.classList.add(e.target.value)
})

// change new message text color
msgColor.addEventListener('change', (e) => {
  newMessage.classList.remove(...textColorArr)
  newMessage.classList.add(e.target.value)
})

// change new message background color
msgBgColor.addEventListener('change', (e) => {
  newArea.classList.remove(...msgBgColorArr)
  newArea.classList.add(e.target.value)
})


// popover
$(function () {
  $('[data-toggle="popover"]').popover()
})

$('.popover-dismiss').popover({
  trigger: 'focus'
})