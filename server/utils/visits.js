const Visit = require('../models/visit')

// visitors counter
module.exports.siteViewsAdmin = async () => {
  await Visit.findOneAndUpdate({}, { $inc: { counter: 1 } }, { new: true })
}
