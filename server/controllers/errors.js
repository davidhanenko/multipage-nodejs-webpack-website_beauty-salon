const Contact = require('../models/contact')
const { renderEJS } = require('../middleware/template')

module.exports.error = async (req, res) => {
  const contacts = await Contact.find({})

  await renderEJS(res, 'errors/404', {
    contacts,
    title: '404',
    cspNonce: res.locals.cspNonce
  })
}
