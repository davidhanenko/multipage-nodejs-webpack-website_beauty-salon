const mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema({
  ourMission: String,
  about: String,
  aboutSection1: String,
  aboutSection2: String,
  aboutSection3: String,

  image: {
    url: String,
    id: String
  }
})

module.exports = mongoose.model('About', aboutSchema)
