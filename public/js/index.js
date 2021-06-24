import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
global.jQuery = require('jquery')

import './header'
import './prices'
import './contacts'
import './email'
import './go-to-top-button'
import '../css/index.css'

// scroll
window.addEventListener(
  'scroll',
  () => {
    document.body.style.setProperty(
      '--scroll',
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
    )
  },
  false
)

// spinner
document.onreadystatechange = function () {
  if (document.readyState !== 'complete') {
    // document.querySelector('body').style.visibility = 'hidden'
    document.querySelector('#page-loading-spinner').style.visibility = 'visible'
  } else {
    document.querySelector('#page-loading-spinner').style.display = 'none'
    document.querySelector('body').style.visibility = 'visible'
  }
}


// show alert/modal after page loaded and 3 sec past
setTimeout(function () {
  // if message show first time and no 'showOnce' - set 'showOnce' item to true
  if (
    !localStorage.getItem('showOnce') ||
    localStorage.getItem('showOnce') === 'true'
  ) {
    // show alert/message
    $('#alertModal').modal('show')
    // set 'showOnce' to false. Don't show message after reloading of main page
    localStorage.setItem('showOnce', 'false')
  }
}, 3000)

// show alert/modal on main page again(after 15 mins from last reload)
setTimeout(function () {
  localStorage.setItem('showOnce', 'true')
}, 1000 * 60 * 15)
