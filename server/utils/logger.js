const { createLogger, format, transports } = require('winston')
require('winston-mongodb')

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.colorize(), format.json()),
  transports: [
    new transports.MongoDB({
      level: 'error',
      db: process.env.DB_URL,
      collection: 'error-logs'
    }),
    new transports.File({ filename: 'combined.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple()
    })
  )
}

module.exports = logger
