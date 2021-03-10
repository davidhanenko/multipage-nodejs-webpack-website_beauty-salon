/* eslint-disable no-undef */
require('dotenv').config()
const cloudinary = require('cloudinary')

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
})

function uploads(file, options) {
  return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
        url: result.secure_url,
        id: result.public_id,
        bytes: result.bytes
      })
    }, options)
  })
}
    module.exports = {
      cloudinary, uploads
    }