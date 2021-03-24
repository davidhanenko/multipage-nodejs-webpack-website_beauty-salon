const Popup = require('../../models/popup')
const Service = require('../../models/service')
const Price = require('../../models/service-price')
const cloudinary = require('../../utils/cloudinary')
const { renderEJS } = require('../../middleware/template')
const { validationResult } = require('express-validator')
const logger = require('../../utils/logger')

//show popup page
module.exports.showPopupPage = async (req, res) => {
  // const popup = (await Popup.findOne({}))
  const services = await Service.find({}, 'title template')
  const prices = await Price.find({}, 'serviceTitle')
  await renderEJS(res, 'admin/popup/popup', {
    csrfToken: req.csrfToken(),
    cspNonce: res.locals.cspNonce,
    // popup,
    services,
    prices,
    title: 'Popup messages',
    page: 'popup'
  })
}

// //options for cloudinary upload
// let opts = {
//   transformation: { width: 550, height: 750, crop: 'fill' },
//   fetch_format: 'auto',
//   quality: 'auto:good',
//   resource_type: 'auto',
//   folder: 'Ilona'
// }

// // create about page
// module.exports.createAbout = async (req, res) => {
//   let errors = validationResult(req)

//   if (!errors.isEmpty()) {
//     errors = errors.array({ onlyFirstError: true })
//     req.flash('error', errors[0].msg)
//   }

//   try {
//     const uploader = async (path, opt) => await cloudinary.uploads(path, opt)

//     let image = null
//     if (req.file) {
//       if (req.file.bytes > 10000000) {
//         req.flash(
//           'error',
//           'Please review size of images. 10Mb is maximum allowed'
//         )
//       }
//       image = await uploader(req.file.path, opts)
//     }

//     let ourMission = req.body.ourMission
//     let about = req.body.about
//     let aboutSection1 = req.body.aboutSection1
//     let aboutSection2 = req.body.aboutSection2
//     let aboutSection3 = req.body.aboutSection3

//     let newAbout = {
//       ourMission,
//       about,
//       aboutSection1,
//       aboutSection2,
//       aboutSection3,
//       image
//     }

//     await About.create(newAbout)
//     res.redirect('/admin/about')
//   } catch (err) {
//     logger.error('From admin/about page:' + err.message)
//     req.flash('error', err.message)
//     res.redirect('back')
//   }
// }

// // update about page
// module.exports.updateAbout = async (req, res) => {
//   const about = await About.findOne({})
//   try {
//     // image upload
//     const uploader = async (path, opt) => await cloudinary.uploads(path, opt)

//     if (req.file && req.file.size < 10000000) {
//       if (about.image.id) {
//         await cloudinary.cloudinary.uploader.destroy(about.image.id)
//         about.image = await uploader(req.file.path, opts)
//       } else {
//         about.image = await uploader(req.file.path, opts)
//       }
//     } else {
//       req.flash(
//         'error',
//         'Please review size of images. 10Mb is maximum allowed'
//       )
//     }

//     // validation errors
//     let errors = validationResult(req)

//     if (!errors.isEmpty()) {
//       errors = errors.array({ onlyFirstError: true })
//       req.flash('error', errors[0].msg)
//     } else {
//       // update req.body data

//       about.ourMission = req.body.ourMission
//       about.about = req.body.about
//       about.aboutSection1 = req.body.aboutSection1
//       about.aboutSection2 = req.body.aboutSection2
//       about.aboutSection3 = req.body.aboutSection3

//       about.save()

//       req.flash('success', 'Information on About page was updated!')

//       res.redirect('/admin/about')
//     }
//   } catch (err) {
//     logger.error('From admin/about page:' + err.message)
//     req.flash('error', err.message)
//   }
// }
