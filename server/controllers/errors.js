const Contact = require('../models/contact')
const { renderEJS } = require('../middleware/template')

module.exports.error = async (req, res) => {
  // reveal contact info on 404 page as a sourse of connection with owner
  const contacts = await Contact.find({})

  //  get 404.ejs file name from path and render it from views with custom renderEJS function (/server/middleware/template.js)
  await renderEJS(res, 'errors/404', {
    contacts,
    title: '404',
    cspNonce: res.locals.cspNonce
  })
}
