// /* eslint-disable no-undef */
// import '../css/map.css'

// let script = document.createElement('script')

// script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.MAP_API}&callback=initMap`

// script.async = true

// // Attach your callback function to the `window` object
// window.initMap = function () {
//   const ilona = {
//     lat: 40.60115784454041,
//     lng: -73.96111381370689
//   }

//   const mapOptions = {
//     mapTypeId: 'roadmap',
//     center: ilona,
//     zoom: 16,
//     scale: 2
//   }
//   // icon
//   const iconImg = require('../imgs/icon-marker.png')

//   const contentString = `<div id="info-window">
//    <h6 class="header">In Good Hands by Ilona</h6>
//    <p>2303 Coney Island Ave, Broklyn, NY, 11223</p>
//     </div>`

//   let map = new google.maps.Map(document.getElementById('map'), mapOptions)

//   // marker
//   let marker = new google.maps.Marker({
//     position: ilona,
//     map,
//     icon: {
//       url: iconImg,
//       labelOrigin: { x: 120, y: 40 },
//       // labelOrigin: new google.maps.Point(145, 55),
//       scaledSize: new google.maps.Size(48, 48)
//     },
//     label: {
//       text: '2303 Coney Island Ave',
//       color: '#8c577a',
//       fontSize: '16px'
//     }
//   })

//   marker.setMap(map)

//   // infowindow
//   const infowindow = new google.maps.InfoWindow({
//     content: contentString
//   })

//   marker.addListener('click', () => {
//     infowindow.open(map, marker)
//   })

//   // marker.addListener('mouseover', () => {
//   //   infowindow.open(map, marker)
//   // })

//   // marker.addListener('mouseout', () => {
//   //   infowindow.close(map, marker)
//   // })
//   const legend = document.getElementById('legend')

//   map.controls[google.maps.ControlPosition.LEFT_TOP].push(legend)
// }

// // Append the 'script' element to 'head'
// document.head.appendChild(script)
