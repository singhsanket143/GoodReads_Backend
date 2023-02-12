const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} : ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
       timestamp({
           format: 'YYYY-MM-DD HH:mm:ss'
       }),
       customFormat
    ),
    transports: [
       new transports.Console(),
       new transports.File({ filename: 'combined.log' })
    ]
});

module.exports = logger;