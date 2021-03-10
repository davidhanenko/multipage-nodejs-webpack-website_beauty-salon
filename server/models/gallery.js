const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gallery = new Schema({
  
  galleryImage: {
    url: String,
    id: String
  }
})

module.exports = mongoose.model('Gallery', gallery)
