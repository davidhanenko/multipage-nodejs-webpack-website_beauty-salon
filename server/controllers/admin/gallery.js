const Gallery = require('../../models/gallery')
const Service = require('../../models/service')
const Price = require('../../models/service-price')
const cloudinary = require('../../utils/cloudinary')
const { renderEJS } = require('../../middleware/template')
const logger = require('../../utils/logger')


// render gallery
module.exports.showGallery = async (req, res) => {
  const services = await Service.find({}, 'title template')
  const prices = await Price.find({}, 'serviceTitle')

  const gallery = await Gallery.find({})

  await renderEJS(res, 'admin/gallery/gallery', {
    csrfToken: req.csrfToken(),
    cspNonce: res.locals.cspNonce,
    page: 'gallery',
    title: 'Gallery',
    prices,
    services,
    gallery
  })
}

// upload new photo to gallery
module.exports.addNewPhoto = async (req, res) => {
  try {
    //options for cloudinary upload
    let opts = {
      transformation: [{ width: 650, height: 650, crop: 'fill' }],
      quality: 100,
      resource_type: 'auto',
      folder: 'Ilona/Gallery'
    }

    const uploader = async (path, opts) => await cloudinary.uploads(path, opts)

    if (req.files['galleryImage'] && req.files['galleryImage'].length <= 3) {
      let galleryImage
      let images = req.files['galleryImage']
      for (let img of images) {
        galleryImage = await uploader(img.path, opts)

        await Gallery.create({ galleryImage })
      }
      req.flash('success', 'New images added to gallery!')
      res.redirect('/admin/gallery')
    } else {
      req.flash('error', 'Please choose images, but not more than 3')
      res.redirect('back')
    }
  } catch (err) {
    logger.error('From admin/gallery page:' + err.message)
    req.flash('error', err.message)
    res.redirect('back')
  }
}

// delete image from gallery
module.exports.deletePhoto = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.img_id)

    await cloudinary.cloudinary.uploader.destroy(image.galleryImage.id)
    req.flash('success', 'Image was delete from gallery')
    res.redirect('back')
  } catch (err) {
    logger.error('From admin/gallery page:' + err.message)
    req.flash('error', err.message)
  }
}
