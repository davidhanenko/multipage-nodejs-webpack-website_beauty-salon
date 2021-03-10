const { createLogger, format, transports } = require('winston')
require('winston-mongodb')

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.colorize(), format.json()),
  transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
    // new transports.MongoDB({
    //   db: process.env.DB_URL,
    //   tryReconnect: true,
    //   level: 'error',
    //   collection: 'error-logs'
    // }),
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
