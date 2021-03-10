const About = require('../../models/about')
const Service = require('../../models/service')
const Price = require('../../models/service-price')
const cloudinary = require('../../utils/cloudinary')
const { renderEJS } = require('../../middleware/template')
const { validationResult } = require('express-validator')
const logger = require('../../utils/logger')

//show about page
module.exports.showAbout = async (req, res) => {
  const about = await About.findOne({})
  const services = await Service.find({}, 'title template')
  const prices = await Price.find({}, 'serviceTitle')
  await renderEJS(res, 'admin/about/about', {
    csrfToken: req.csrfToken(),
    cspNonce: res.locals.cspNonce,
    about,
    services,
    prices,
    title: 'About',
    page: 'about'
  })
}

//options for cloudinary upload
let opts = {
  transformation: [
    { width: 550, height: 750, crop: 'fill' },
    { width: 'auto', dpr: 'auto', crop: 'scale' }
  ],
  fetch_format: 'auto',
  quality: 85,
  resource_type: 'auto',
  folder: 'Ilona'
}

// create about page
module.exports.createAbout = async (req, res) => {
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    errors = errors.array({ onlyFirstError: true })
    req.flash('error', errors[0].msg)
  }

  try {
    const uploader = async (path, opt) => await cloudinary.uploads(path, opt)

    let image = null
    if (req.file) {
      if (req.file.bytes > 10000000) {
        req.flash(
          'error',
          'Please review size of images. 10Mb is maximum allowed'
        )
      }
      image = await uploader(req.file.path, opts)
    }

    let ourMission = req.body.ourMission
    let about = req.body.about
    let aboutSection1 = req.body.aboutSection1
    let aboutSection2 = req.body.aboutSection2
    let aboutSection3 = req.body.aboutSection3

    let newAbout = {
      ourMission,
      about,
      aboutSection1,
      aboutSection2,
      aboutSection3,
      image
    }

    await About.create(newAbout)
    res.redirect('/admin/about')
  } catch (err) {
    logger.error('From admin/about page:' + err.message)
    req.flash('error', err.message)
    res.redirect('back')
  }
}

// update about page
module.exports.updateAbout = async (req, res) => {
  const uploader = async (path, opt) => await cloudinary.uploads(path, opt)

  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    errors = errors.array({ onlyFirstError: true })
    req.flash('error', errors[0].msg)
  }
  try {
    const about = await About.findOne({})
    if (req.file) {
      if (req.file.size > 10000000) {
        req.flash(
          'error',
          'Please review size of images. 10Mb is maximum allowed'
        )
      } else {
        if (about.image.id) {
          await cloudinary.cloudinary.uploader.destroy(about.image.id)
          about.image = await uploader(req.file.path, opts)
        } else {
          about.image = await uploader(req.file.path, opts)
        }
      }
    }

    about.ourMission = req.body.ourMission
    about.about = req.body.about
    about.aboutSection1 = req.body.aboutSection1
    about.aboutSection2 = req.body.aboutSection2
    about.aboutSection3 = req.body.aboutSection3

    about.save()

    req.flash('success', 'Information on About page was updated!')

    res.redirect('/admin/about')
  } catch (err) {
    logger.error('From admin/about page:' + err.message)
    req.flash('error', err.message)
  }
}
