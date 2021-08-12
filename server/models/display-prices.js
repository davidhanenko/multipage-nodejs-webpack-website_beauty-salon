const mongoose = require('mongoose')
const Schema = mongoose.Schema

const displayPricesSchema = new Schema({
  displayPrices: Boolean
})

module.exports = mongoose.model('DisplayPrice', displayPricesSchema)
