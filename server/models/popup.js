const mongoose = require('mongoose')

const previousSchema = new mongoose.Schema ({text: String})
const popupSchema = new mongoose.Schema({
  message: String,
  current: String,

  previous: [previousSchema],

  date: {
    type: Date,
    default: Date.now
  },

  image: {
    url: String,
    id: String
  }
})

module.exports = mongoose.model('Popup', popupSchema)
