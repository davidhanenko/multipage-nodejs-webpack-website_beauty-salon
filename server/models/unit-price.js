const mongoose = require('mongoose')
const Schema = mongoose.Schema

const unitSchema = new Schema({
 
      unitTitle: String,
      singlePrice: String,
      multiPrice: String
    
})

module.exports = mongoose.model('Unit', unitSchema)
