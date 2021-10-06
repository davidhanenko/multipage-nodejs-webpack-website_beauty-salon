// about page
const Service = require('../models/service')
const Contact = require('../models/contact')
const About = require('../models/about')
const MainTag = require('../models/main-tag')
const DisplayContent = require('../models/display-content')
const { renderEJS } = require('../middleware/template')

module.exports.about = async (req, res) => {
  const mainTags = await MainTag.findOne({})
  const about = await About.findOne({})
  // ervises to reveal into dropdown menu
  const services = await Service.find({}, 'title template')
  // contacts info to reveal into dropdown menu
  const contacts = await Contact.find({})
  // display mode for about page
  const displayAbout = await DisplayContent.findOne({ content: 'about' })
  // display mode for gallery page
  const displayGallery = await DisplayContent.findOne({ content: 'gallery' })
  // logout from admin if you go back or straight to about page from admin page
  req.logout()
  // // get about.ejs file name from path and render it from views with custom renderEJS function (/server/middleware/template.js)
  if (displayAbout.display) {
    await renderEJS(res, 'about', {
      csrfToken: req.csrfToken(),
      cspNonce: res.locals.cspNonce,
      page: 'about',
      title: `${mainTags.title} | About`,
      // description of page for SEO
      description: mainTags.descriprion,
      about,
      services,
      contacts,
      displayGallery,
      displayAbout
    }) 
  } else {
    return res.redirect('/404')
  }
}
