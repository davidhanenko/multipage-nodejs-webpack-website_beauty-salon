const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageBeforeAfter = new Schema({
  imageBefore: {
    url: String,
    id: String
  },
  imageAfter: {
    url: String,
    id: String
  }
})

module.exports = mongoose.model('ImageBeforeAfter', imageBeforeAfter)
