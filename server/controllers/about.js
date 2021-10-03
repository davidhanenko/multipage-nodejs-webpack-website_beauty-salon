// about page
const Service = require('../models/service')
const Contact = require('../models/contact')
const About = require('../models/about')
const MainTag = require('../models/main-tag')
const { renderEJS } = require('../middleware/template')

module.exports.about = async (req, res) => {
  const mainTags = await MainTag.findOne({})
  const about = await About.findOne({})
  // ervises to reveal into dropdown menu
  const services = await Service.find({}, 'title template')
  // contacts info to reveal into dropdown menu
  const contacts = await Contact.find({})
  // logout from admin if you go back or straight to about page from admin page
  req.logout()
  // // get about.ejs file name from path and render it from views with custom renderEJS function (/server/middleware/template.js)
  await renderEJS(res, 'about', {
    csrfToken: req.csrfToken(),
    cspNonce: res.locals.cspNonce,
    page: 'about',
    title: `${mainTags.title} | About`,
    // description of page for SEO
    description: mainTags.descriprion,
    about,
    services,
    contacts
  })
}
