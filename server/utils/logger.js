const { createLogger, format, transports } = require('winston')
require('winston-mongodb')
const mongoose = require('mongoose')

const mongoConn = mongoose.connection

const timezoned = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York'
  })
}

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: timezoned }),
    format.colorize(),
    format.prettyPrint()
  ),
  transports: [
    new transports.MongoDB({
      db: mongoConn,
      tryReconnect: true,
      level: 'error',
      collection: 'error-logs',
      expireAfterSeconds: 60 * 60 * 24
      // format: format.combine(
      //   format.timestamp({ format: timezoned }),
      //   format.colorize(),
      //   format.prettyPrint()
      // )
    }),
    new transports.MongoDB({
      // format: format.combine(
      //   format.timestamp({ format: timezoned }),
      //   format.prettyPrint(),
      //   format.colorize()
      // ),
      db: mongoConn,
      tryReconnect: true,
      level: 'warn',
      collection: 'warn-logs',
      expireAfterSeconds: 60 * 60 * 24
    })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      level: 'error',
      format: format.simple()
    })
  )
}

module.exports = logger
