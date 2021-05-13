const Contact = require('../../models/contact')
const Price = require('../../models/service-price')
const Service = require('../../models/service')
const { renderEJS } = require('../../middleware/template')
const logger = require('../../utils/logger')


//show contacts views & edit page
module.exports.showContacts = async (req, res) => {
  const services = await Service.find({}, 'title template')
  const prices = await Price.find({}, 'serviceTitle')
  const contacts = await Contact.find({})
  const data = (await req.session.data) || {}
  await renderEJS(res, 'admin/contacts/contacts', {
    cspNonce: res.locals.cspNonce,
    contacts,
    services,
    prices,
    data,
    title: 'contacts-edit',
    page: 'contacts',
    csrfToken: req.csrfToken()
  })
}

//upload new contact
module.exports.addContacts = async (req, res) => {
  try {
    const {
      address1stLine,
      address2ndLine,
      telephone,
      email,
      day,
      dayFrom,
      dayTo,
      hoursFrom,
      hoursTo,
      minsFrom,
      minsTo,
      ampmFrom,
      ampmTo
    } = req.body

    let newAddress = {
      address1stLine,
      address2ndLine
    }
    let newTelEmail = {
      telephone,
      email
    }

    let newHours = {
      day,
      dayFrom,
      dayTo,
      hoursFrom,
      hoursTo,
      minsFrom,
      minsTo,
      ampmFrom,
      ampmTo
    }

    //  add new address
    for (let val of Object.values(newAddress)) {
      if (val !== '' && val !== undefined) {
        if (!address1stLine) {
          // data to fill form with current input
          req.session.data = req.body
          req.flash('error', 'First address line required')
          return res.redirect('back')
        } else {
          await Contact.create(newAddress)
          req.flash('success', 'Contact information added successefull')
          return res.redirect('/admin/contacts/contacts-edit')
        }
      }
    }
    // add new telephone, email
    for (let val of Object.values(newTelEmail)) {
      if (val !== '' && val !== undefined) {
        await Contact.create(newTelEmail)

        req.flash('success', 'Contact information added successefull')
        return res.redirect('/admin/contacts/contacts-edit')
      }
    }

    // add new hours
    for (let val of Object.values(newHours)) {
      if (val !== '' && val !== undefined) {
        // have to select one working day or dayFrom with dayTo
        if ((dayFrom && day) || (dayTo && day) || (day && dayTo && dayFrom)) {
          // data to fill form with current input
          req.session.data = req.body
          req.flash(
            'error',
            'Please choose both "Day from" and "Day to", or only one working day'
          )

          return res.redirect('back')
        }

        // have to chose second day if first selected
        if ((dayFrom && dayTo == '') || (dayFrom == '' && dayTo)) {
          // data to fill form with current input
          req.session.data = req.body
          req.flash(
            'error',
            'Please choose both "Day from" and "Day to", or only one working day'
          )
          return res.redirect('back')
        }

        await Contact.create(newHours)
        req.session.data = {}

        req.flash('success', 'Contact information added successefull')
        return res.redirect('/admin/contacts/contacts-edit')
      }
    }

    req.flash('error', 'Nothing was to update')
    res.redirect('back')
  } catch (err) {
    logger.error('From admin/contacts page:' + err.message)
    res.redirect('back')
    req.flash('error', err.message)
  }
}

// Edit contacts
module.exports.editContacts = async (req, res) => {
  try {
    const {
      address1stLine,
      address2ndLine,
      telephone,
      email,
      day,
      dayFrom,
      dayTo,
      hoursFrom,
      hoursTo,
      minsFrom,
      minsTo,
      ampmFrom,
      ampmTo
    } = req.body

    let editAddress = {
      address1stLine,
      address2ndLine
    }
    let editTelEmail = {
      telephone,
      email
    }

    let editHours = {
      day,
      dayFrom,
      dayTo,
      hoursFrom,
      hoursTo,
      minsFrom,
      minsTo,
      ampmFrom,
      ampmTo
    }

    //  edit address
    for (let val of Object.values(editAddress)) {
      if (val !== '' && val !== undefined) {
        if (!address1stLine) {
          // data to fill form with current input
          req.session.data = req.body
          req.flash('error', 'First address line required')
          return res.redirect('back')
        } else {
          await Contact.findByIdAndUpdate(req.params.contact_id, editAddress)
          req.flash('success', 'Contact information updated successefull')
          return res.redirect('/admin/contacts/contacts-edit')
        }
      }
    }
    // add new telephone, email
    for (let val of Object.values(editTelEmail)) {
      if (val !== '' && val !== undefined) {
        await Contact.findByIdAndUpdate(req.params.contact_id, editTelEmail)

        req.flash('success', 'Contact information updated successefull')
        return res.redirect('/admin/contacts/contacts-edit')
      }
    }

    // add new hours
    for (let val of Object.values(editHours)) {
      if (val !== '' && val !== undefined) {
        // have to select one working day or dayFrom with dayTo
        if ((dayFrom && day) || (dayTo && day) || (day && dayTo && dayFrom)) {
          // data to fill form with current input
          req.session.data = req.body
          req.flash(
            'error',
            'Please choose both "Day from" and "Day to", or only one working day'
          )

          return res.redirect('back')
        }

        // have to chose second day if first selected
        if ((dayFrom && dayTo == '') || (dayFrom == '' && dayTo)) {
          // data to fill form with current input
          req.session.data = req.body
          req.flash(
            'error',
            'Please choose both "Day from" and "Day to", or only one working day'
          )
          return res.redirect('back')
        }
      }
      await Contact.findByIdAndUpdate(req.params.contact_id, editHours)
    }

    req.flash('success', 'Contact information updated successefull')
    res.redirect('/admin/contacts/contacts-edit')
  } catch (err) {
    logger.error('From admin/contacts page:' + err.message)
    req.flash('error', err.message)
    res.redirect('back')
  }
}

// delete contact
module.exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndRemove(req.params.contact_id)
    req.flash('success', 'Contacts information deleted!')
    res.redirect('back')
  } catch (err) {
    logger.error('From admin/contacts page:' + err.message)
    req.flash('error', err.message)
    res.redirect('back')
  }
}
