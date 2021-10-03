const Service = require('../models/service')
const MainTag = require('../models/main-tag')
const Gallery = require('../models/gallery')
const { renderEJS } = require('../middleware/template')

module.exports.gallery = async (req, res) => {
  // tags for SEO
  const mainTags = await MainTag.findOne({})
  // servises to reveal into dropdown menu
  const services = await Service.find({}, 'title template')

  const gallery = await Gallery.find({})
  // logout from admin if you go back or straight to gallery from admin page
  req.logout()
  // get gallery.ejs file name from path and render it from views with custom renderEJS function (/server/middleware/template.js)
  await renderEJS(res, 'gallery', {
    // cspNonce for Content Security Policy
    cspNonce: res.locals.cspNonce,
    page: 'gallery',
    title: `${mainTags.title} | Gallery`,
    // description of page for SEO
    description: mainTags.descriprion,
    services,
    gallery
  })
}
