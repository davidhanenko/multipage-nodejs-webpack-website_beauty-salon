const mongoose = require('mongoose')

const mainSchema = new mongoose.Schema({
  title: String,
  description: String
})

module.exports = mongoose.model('Main', mainSchema)
