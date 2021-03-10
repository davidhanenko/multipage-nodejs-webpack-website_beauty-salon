const mongoose = require('mongoose')
const Schema = mongoose.Schema

let serviceSchema = new Schema({
  template: String,
  title: String,
  descriptionMain: String,

  description1: String,
  description2: String,
  description3: String,
  description4: String,

  imageMain: {
    url: String,
    id: String
  },
  image1: {
    url: String,
    id: String
  },
  image2: {
    url: String,
    id: String
  },
  image3: {
    url: String,
    id: String
  },
  image4: {
    url: String,
    id: String
  },

  video: {
    url: String,
    id: String
  },

  imageBeforeAfter: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ImageBeforeAfter'
    }
  ]
})

module.exports = mongoose.model('Service', serviceSchema)
