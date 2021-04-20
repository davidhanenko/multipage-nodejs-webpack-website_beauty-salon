const mongoose = require('mongoose')

const mainTagSchema = new mongoose.Schema({
  title: String,
  description: String
})

module.exports = mongoose.model('MainTag', mainTagSchema)
