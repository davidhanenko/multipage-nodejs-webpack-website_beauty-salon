
const Service = require('../models/service')
const Price = require('../models/service-price')
const DisplayContent = require('../models/display-content')
const Contact = require('../models/contact')
const Popup = require('../models/popup')
const MainTag = require('../models/main-tag')
const { renderEJS } = require('../middleware/template')


// index(main page)
module.exports.main = async (req, res) => {
  // logout from admin
  req.logout()
  // tags for SEO
  const mainTags = await MainTag.findOne({})
  // if one of our popup message is selected as current, reveal it on main page
  const popupCurrent = await Popup.findOne({ current: true })
  // all services and prices to reveal on menu and main page
  const services = await Service.find({})
  const prices = await Price.find({}).populate('unitPrice')
  // display mode for prices
  const displayPrices = await DisplayContent.findOne({ content: 'prices' })
  // display mode for about page
  const displayAbout = await DisplayContent.findOne({ content: 'about' })
  // display mode for gallery page
  const displayGallery = await DisplayContent.findOne({ content: 'gallery' })
  // contact info
  const contacts = await Contact.find({})
  // errors for email sending
  const errors = (await req.session.errors) || {}
  // input data from email fields
  const data = (await req.session.data) || {}

  // get index.ejs file name from path and render it from views with custom renderEJS function (/server/middleware/template.js)
  await renderEJS(res, 'index', {
    // token to protect from CSRF
    csrfToken: req.csrfToken(),
    // nonce created on our server, to validate sourcew of content
    cspNonce: res.locals.cspNonce,
    page: 'home',
    title: mainTags.title,
    // description of page for SEO, managed from admin pages
    description: mainTags.description,
    data,
    errors,
    popupCurrent,
    services,
    prices,
    contacts,
    displayPrices,
    displayAbout,
    displayGallery
  })
}

