const mongoose = require('mongoose')
const Schema = mongoose.Schema

const displayContentSchema = new Schema({
  content: String,
  display: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('DisplayContent', displayContentSchema)
