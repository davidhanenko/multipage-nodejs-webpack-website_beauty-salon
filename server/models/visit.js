const mongoose = require('mongoose')

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}

const visitSchema = new mongoose.Schema(
  {
    counter: {
      type: Number,
      required: true
    }
  },
  schemaOptions
)

module.exports = mongoose.model('Visit', visitSchema)
