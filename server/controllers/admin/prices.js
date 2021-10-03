const Price = require('../../models/service-price')
const Service = require('../../models/service')
const Unit = require('../../models/unit-price')
const { renderEJS } = require('../../middleware/template')
const { validationResult, matchedData } = require('express-validator')
const logger = require('../../utils/logger')

//show add-new service prices block
module.exports.showAddNewPrice = async (req, res) => {
  const services = await Service.find({}, 'title template')
  const prices = await Price.find({}, 'serviceTitle')

  const data = (await req.session.data) || {}
  await renderEJS(res, 'admin/prices/price-new', {
    csrfToken: req.csrfToken(),
    cspNonce: res.locals.cspNonce,
    title: 'New-price',
    services,
    prices,
    data,
    page: 'add new price'
  })
}

//upload new service prices block
module.exports.addNewPrice = async (req, res) => {
  // max age for input session
  req.session.cookie.maxAge = 5 * 60 * 1000
  //  validation errors
  let errors = validationResult(req)

  req.session.data = req.body

  if (!errors.isEmpty()) {
    errors = errors.array({ onlyFirstError: true })
    logger.info('From admin/prices page:' + errors[0].message)
    req.flash('error', errors[0].msg)
    res.redirect('/admin/prices/price-new')
  } else {
    try {
      // create new price
      const newPrice = matchedData(req)

      await Price.create(newPrice)

      req.flash('success', 'New price added!')
      req.session.data = null
      res.redirect('/admin')
    } catch (err) {
      logger.error('From admin/prices page:' + err.message)
      req.flash('error', err.message)
      res.redirect('back')
    }
  }
}

//show service prices block
module.exports.showPrices = async (req, res) => {
  const services = await Service.find({}, 'title template')
  const prices = await Price.find({}, 'serviceTitle')
  const servicePrice = await (await Price.findById(req.params.id))
    .populate('unitPrice')
    .execPopulate()

  const data = (await req.session.data) || {}

  await renderEJS(res, 'admin/prices/prices', {
    csrfToken: req.csrfToken(),
    cspNonce: res.locals.cspNonce,
    title: servicePrice.serviceTitle,
    page: servicePrice.serviceTitle,
    servicePrice,
    prices,
    services,
    data
  })
}

//edit service price block
module.exports.editPriceBlock = async (req, res) => {
  // validation errors
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    errors = errors.array({ onlyFirstError: true })
    req.flash('error', errors[0].msg)
    res.redirect(`/admin/prices/${req.params.price_id}`)
  } else {
    const { serviceTitle, singleTreatment, multiTreatments } = req.body

    try {
      let updatedPrice = { serviceTitle, singleTreatment, multiTreatments }

      await Price.findByIdAndUpdate(req.params.price_id, updatedPrice)

      req.flash('success', 'Price updated')

      res.redirect(`/admin/prices/${req.params.price_id}`)
    } catch (err) {
      logger.error('From admin/prices page:' + err.message)
      req.flash('error', err.message)
    }
  }
}

// delete price block for service
module.exports.deletePriceBlock = async (req, res) => {
  try {
    await Price.findByIdAndRemove(req.params.price_id)
    req.flash('success', 'Price deleted!')
    res.redirect('back')
  } catch (err) {
    logger.error('From admin/pricespage:' + err.message)
    req.flash('error', err.message)
  }
}

//upload new unit price to prise block
module.exports.addNewUnitPrice = async (req, res) => {
  let servicePrice = await Price.findById(req.params.id)
  // max age for input session
  req.session.cookie.maxAge = 5 * 60 * 1000
  //  validation errors
  let errors = validationResult(req)

  req.session.data = req.body

  if (!errors.isEmpty()) {
    errors = errors.array({ onlyFirstError: true })
    logger.debug('From admin/pricespage:' + errors[0].msg)
    req.flash('error', errors[0].msg)
    res.redirect('/admin/prices/' + servicePrice._id)
  } else {
    try {
      const newUnitPrice = matchedData(req)

      const unit = await Unit.create(newUnitPrice)

      unit.save()
      servicePrice.unitPrice.push(unit)
      servicePrice.save()

      req.flash('success', 'Price added')
      req.session.data = null
      res.redirect('/admin/prices/' + servicePrice._id)
    } catch (err) {
      logger.error('From admin/pricespage:' + err.message)
      req.flash('error', err.message)
      res.redirect('back')
    }
  }
}

//edit unit price
module.exports.editUnitPrice = async (req, res) => {
  const { unitTitle, singlePrice, multiPrice } = req.body

  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    errors = errors.array({ onlyFirstError: true })
    logger.debug('From admin/pricespage:' + errors[0].msg)
    req.flash('error', errors[0].msg)
    res.redirect(`/admin/prices/${req.params.id}`)
  }

  try {
    let newUnitPrice = { unitTitle, singlePrice, multiPrice }

    await Unit.findByIdAndUpdate(req.params.unit_id, newUnitPrice)

    req.flash('success', 'Price updated')

    res.redirect(`/admin/prices/${req.params.id}`)
  } catch (err) {
    logger.error('From admin/pricespage:' + err.message)
    req.flash('error', err.message)
    res.redirect(`/admin/prices/${req.params.id}`)
  }
}

// delete unit price
module.exports.deleteUnitPrice = async (req, res) => {
  try {
    const servicePrice = await Price.findById(req.params.id)
    const unit = await Unit.findByIdAndRemove(req.params.unit_id)

    servicePrice.unitPrice.pull({ _id: unit._id })
    servicePrice.save()

    req.flash('success', 'Price deleted!')

    res.redirect('back')
  } catch (err) {
    logger.error('From admin/pricespage:' + err.message)
    req.flash('error', err.message)
    res.redirect(`/admin/prices/${req.params.id}`)
  }
}
