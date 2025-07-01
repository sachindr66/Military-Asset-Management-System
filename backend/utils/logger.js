import winston from 'winston';

const isProduction = process.env.NODE_ENV === 'production';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    ...(!isProduction
      ? [
          new winston.transports.File({ filename: 'logs/combined.log' }),
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
          }),
        ]
      : []),
  ],
});

export const logRequest = (req, res, next) => {
  const { method, url } = req;
  const timestamp = new Date().toISOString();
  logger.info(`${timestamp} - ${method} ${url}`);
  next();
};

export const logError = (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  logger.error(`${timestamp} - Error: ${err.message} - ${err.stack}`);
  res.status(500).send({ message: 'Internal Server Error' });
};

export default logger;
