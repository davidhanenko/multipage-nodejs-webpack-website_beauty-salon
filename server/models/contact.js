const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
 
      address1stLine: String,
      address2ndLine: String,

      telephone: String,

      email: String,

      day: String,
      dayFrom: String,
      dayTo: String,

      hoursFrom: String,
      minsFrom: String,

      hoursTo: String,
      minsTo: String,

      ampmFrom: String,
      ampmTo: String

})

module.exports = mongoose.model('Contact', contactSchema)