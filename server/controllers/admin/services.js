const bcrypt = require('bcryptjs')
const Service = require('../../models/service.js')
const Price = require('../../models/service-price')
const ImageBeforeAfter = require('../../models/before-after-img')
const cloudinary = require('../../utils/cloudinary')
const { renderEJS } = require('../../middleware/template')
const { validationResult } = require('express-validator')
const logger = require('../../utils/logger.js')

// render Add new service page
module.exports.showNewService = async (req, res) => {
  const services = await Service.find({}, 'title template')
  const prices = await Price.find({}, 'serviceTitle')

  await renderEJS(res, 'admin/our_services/service-new', {
    csrfToken: req.csrfToken(),
    cspNonce: res.locals.cspNonce,
    services,
    prices,
    page: 'underfined',
    title: 'New-service'
  })
}

//options for cloudinary upload
let optsMain = {
  transformation: { width: 550, height: 550, dpr: 'auto', crop: 'fill' },
  fetch_format: 'auto',
  quality: 'auto:good',
  resource_type: 'auto',
  folder: 'Ilona'
}

let optsSecondary = {
  transformation: { width: 450, dpr: 'auto', crop: 'fill' },
  quality: 'auto:good',
  fetch_format: 'auto',
  resource_type: 'auto',
  folder: 'Ilona'
}

let optsVideo = {
  resource_type: 'auto',
  chunk_size: 6000000,
  folder: 'Ilona/Video',
  eager: [
    { width: 300, height: 300, crop: 'pad', audio_codec: 'none' },
    {
      width: 160,
      height: 100,
      crop: 'crop',
      gravity: 'south',
      audio_codec: 'none'
    }
  ],
  eager_async: true
}

// create new service
module.exports.createService = async (req, res) => {
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    errors = errors.array({ onlyFirstError: true })
    req.flash('error', errors[0].msg)
    res.redirect('back')
  }
  try {
    const {
      template,
      title,
      descriptionMain,
      description1,
      description2,
      description3,
      description4
    } = req.body

    const uploader = async (path, opt) => await cloudinary.uploads(path, opt)
    let imageMain = null,
      image1 = null,
      image2 = null,
      image3 = null,
      image4 = null,
      video = null

    if (req.files['imageMain']) {
      if (req.files['imageMain'][0].size < 10000000) {
        imageMain = await uploader(req.files['imageMain'][0].path, optsMain)
      } else {
        req.flash(
          'error',
          'Please review size of images. 10Mb is maximum allowed'
        )
      }
    } else {
      req.flash('error', 'Main image for service is required')
    }

    if (req.files['image1'] && req.files['image1'][0].size < 10000000) {
      image1 = await uploader(req.files['image1'][0].path, optsSecondary)
    } else {
      req.flash(
        'error',
        'Please review size of images. 10Mb is maximum allowed'
      )
    }

    if (req.files['image2'] && req.files['image2'][0].size < 10000000) {
      image2 = await uploader(req.files['image2'][0].path, optsSecondary)
    } else {
      req.flash(
        'error',
        'Please review size of images. 10Mb is maximum allowed'
      )
    }

    if (req.files['image3'] && req.files['image3'][0].size < 10000000) {
      image3 = await uploader(req.files['image3'][0].path, optsSecondary)
    } else {
      req.flash(
        'error',
        'Please review size of images. 10Mb is maximum allowed'
      )
    }
    if (req.files['image4'] && req.files['image4'][0].size < 10000000) {
      image4 = await uploader(req.files['image4'][0].path, optsSecondary)
    } else {
      req.flash(
        'error',
        'Please review size of images. 10Mb is maximum allowed'
      )
    }

    if (req.files['video'] && req.files['video'][0].size < 100000000) {
      video = await uploader(req.files['video'][0].path, optsVideo)
    } else {
      req.flash(
        'error',
        'Please review size of video. 100Mb is maximum allowed'
      )
    }

    let newService = {
      template,
      title,
      descriptionMain,
      description1,
      description2,
      description3,
      description4,
      imageMain,
      image1,
      image2,
      image3,
      image4,
      video
    }

    await Service.create(newService)
    req.flash('success', 'New service added!')
    res.redirect('/admin')
  } catch (err) {
    logger.error('From Services:' + err.message)
    req.flash('error', err.message)
    res.redirect('back')
  }
}

//show service
module.exports.showService = async (req, res) => {
  const services = await Service.find({}, 'title template')
  const prices = await Price.find({}, 'serviceTitle')
  const service = await (await Service.findOne({ title: req.params.title }))
    .populate('imageBeforeAfter')
    .execPopulate()
  await renderEJS(res, `admin/our_services/${service.template}`, {
    csrfToken: req.csrfToken(),
    cspNonce: res.locals.cspNonce,
    title: `${service.title.charAt(0).toUpperCase() + service.title.slice(1)}`,
    page: service.title,
    service,
    services,
    prices
  })
}

// update service information/data
module.exports.updateService = async (req, res) => {
  const service = await Service.findOne({ title: req.params.title })

  try {
    const uploader = async (path, opt) => await cloudinary.uploads(path, opt)

    // main image
    if (req.files) {
      if (req.files['imageMain'] && req.files['imageMain'][0].size < 10000000) {
        if (service.imageMain.id) {
          await cloudinary.cloudinary.uploader.destroy(service.imageMain.id)
        }
        service.imageMain = await uploader(
          req.files['imageMain'][0].path,
          optsMain
        )
      } else {
        req.flash(
          'error',
          'Please review size of images. 10Mb is maximum allowed'
        )
      }
      // first image
      if (req.files['image1'] && req.files['image1'][0].size < 10000000) {
        if (service.image1.id) {
          await cloudinary.cloudinary.uploader.destroy(service.image1.id)
        }
        service.image1 = await uploader(
          req.files['image1'][0].path,
          optsSecondary
        )
      } else {
        req.flash(
          'error',
          'Please review size of images. 10Mb is maximum allowed'
        )
      }
      // second image
      if (req.files['image2'] && req.files['image2'][0].size < 10000000) {
        if (service.image2.id) {
          await cloudinary.cloudinary.uploader.destroy(service.image2.id)
        }
        service.image2 = await uploader(
          req.files['image2'][0].path,
          optsSecondary
        )
      } else {
        req.flash(
          'error',
          'Please review size of images. 10Mb is maximum allowed'
        )
      }
      // 3rd image
      if (req.files['image3'] && req.files['image3'][0].size < 10000000) {
        if (service.image3.id) {
          await cloudinary.cloudinary.uploader.destroy(service.image3.id)
        }
        service.image3 = await uploader(
          req.files['image3'][0].path,
          optsSecondary
        )
      } else {
        req.flash(
          'error',
          'Please review size of images. 10Mb is maximum allowed'
        )
      }
      // 4th image
      if (req.files['image4'] && req.files['image4'][0].size < 10000000) {
        if (service.image4.id) {
          await cloudinary.cloudinary.uploader.destroy(service.image4.id)
        }
        service.image4 = await uploader(
          req.files['image4'][0].path,
          optsSecondary
        )
      } else {
        req.flash(
          'error',
          'Please review size of images. 10Mb is maximum allowed'
        )
      }

      // video
      if (req.files['video'] && req.files['video'][0].size < 100000000) {
        if (service.video.id) {
          await cloudinary.cloudinary.uploader.destroy(service.video.id, {
            invalidate: true,
            resource_type: 'video'
          })
        }
        service.video = await uploader(req.files['video'][0].path, optsVideo)
      } else {
        req.flash(
          'error',
          'Please review size of video. 100Mb is maximum allowed'
        )
      }

      if (req.body.deleteVideo) {
        await cloudinary.cloudinary.uploader.destroy(service.video.id, {
          invalidate: true,
          resource_type: 'video'
        })

        await service.updateOne({ $unset: { video: '' } })
      }
    }

    let errors = validationResult(req)

    if (!errors.isEmpty()) {
      errors = errors.array({ onlyFirstError: true })
      req.flash('error', errors[0].msg)
      res.redirect(`/admin/services/${service.title}`)
    } else {
      try {
        service.title = req.body.title
        service.descriptionMain = req.body.descriptionMain
        service.description1 = req.body.description1
        service.description2 = req.body.description2
        service.description3 = req.body.description3
        service.description4 = req.body.description4

        service.save()
        req.flash('success', 'Service information updated')
        res.redirect(`/admin/services/${service.title}`)
      } catch (err) {
        req.flash('error', err.message)
        res.redirect(`/admin/services/${service.title}`)
      }
    }
  } catch (err) {
    logger.error('From Services:' + err)
    req.flash('error', err.message)
    res.redirect(`/admin/services/${service.title}`)
  }
}

// delete service
module.exports.deleteService = async (req, res) => {
  try {
    const isMatch = await bcrypt.compare(
      req.body.permission,
      req.user.permission
    )
    if (isMatch) {
      await Service.findByIdAndDelete(req.params.id)
      req.flash('success', 'Service deleted')
      res.redirect('/admin')
    } else {
      req.flash('error', 'Wrong permission password! Try again')
      res.redirect('back')
    }
  } catch (err) {
    logger.error('From Services:' + err)
    req.flash('error', err.message)
  }
}

// create & update title and description tags
module.exports.addTags = async (req, res) => {
  const service = await Service.findOne({ title: req.params.title })
  try {
    await service.updateOne(
      {
        titleTag: req.body.titleTag.toUpperCase(),
        descriptionTag: req.body.descriptionTag
      },
      {
        new: true,
        upsert: true
      }
    )
    req.flash('success', 'Tags added/updated')
    res.redirect(`/admin/services/${service.title}`)
  } catch (err) {
    logger.error('From Services:' + err)
    req.flash('error', err.message)
    res.redirect('back')
  }
}

// upload new before-after image to service
module.exports.addNewImageBA = async (req, res) => {
  try {
    const service = await Service.findOne({ title: req.params.title })
    let isCoverEyes = req.body.isCoverEyes

    //options for cloudinary upload
    let opts = {
      transformation: [{ width: 400, height: 400, crop: 'fill' }],
      quality: 85,
      resource_type: 'auto',
      folder: 'Ilona/BA'
    }
    if (isCoverEyes) {
      opts = {
        transformation: [
          { width: 400, height: 400, crop: 'fill' },
          {
            flags: 'region_relative',
            gravity: 'adv_eyes',
            overlay: 'rectangle',
            width: '1.7'
          }
        ],
        quality: 85,
        resource_type: 'auto',
        folder: 'Ilona/BA'
      }
    }

    const uploader = async (path, opts) => await cloudinary.uploads(path, opts)
    // check if both images been choosen
    if (req.files['image-before'] && req.files['image-after']) {
      let imageBefore = await uploader(req.files['image-before'][0].path, opts)

      let imageAfter = await uploader(req.files['image-after'][0].path, opts)

      // check images size
      if (imageBefore.bytes < 10000000 && imageAfter.bytes < 10000000) {
        const imageBA = await ImageBeforeAfter.create({
          imageBefore,
          imageAfter
        })

        imageBA.save()
        service.imageBeforeAfter.push(imageBA)
        service.save()

        req.flash('success', 'Images successefully uploaded!')

        res.redirect(`/admin/services/${service.title}`)
      } else {
        req.flash(
          'error',
          'Please review size of images. 10Mb is maximum size for each image.'
        )
        res.redirect('back')
      }
    } else {
      req.flash('error', 'Please choose TWO images!')
      res.redirect('back')
    }
  } catch (err) {
    logger.error('From before-after images:' + err.message)
    req.flash('error', err.message)
    res.redirect('back')
  }
}

// delete before after image
module.exports.deleteImageBA = async (req, res) => {
  try {
    const service = await Service.findOne({ title: req.params.title })
    const image = await ImageBeforeAfter.findByIdAndDelete(req.params.img_id)

    await cloudinary.cloudinary.uploader.destroy(image.imageBefore.id)
    await cloudinary.cloudinary.uploader.destroy(image.imageAfter.id)

    await service.imageBeforeAfter.pull({ _id: image._id })
    service.save()
    req.flash('success', 'Image deleted')
    res.redirect('back')
  } catch (err) {
    logger.error('From before-after images:' + err.message)
    req.flash('error', err.message)
    res.redirect('back')
  }
}
