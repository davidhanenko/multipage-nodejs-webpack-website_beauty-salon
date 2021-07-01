const Visit = require('../models/visit')
const logger = require('./logger')

// visitors counter
module.exports.siteViewsAdmin = async () => {
  try {
    await Visit.findOneAndUpdate({}, { $inc: { counter: 1 } }, { new: true })
    const visit = await Visit.findOne({})
    visit.visits.push(visit.updated_at)
    visit.save()
  } catch (err) {
    logger.error('From visits counter:' + err.message)
  }
}
