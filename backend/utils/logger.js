import winston from 'winston';

// Create a winston logger instance
const logger = winston.createLogger({
  level: 'info', // Log all levels of info and above
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Log to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // Log to a file
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Log HTTP requests and responses
export const logRequest = (req, res, next) => {
  const { method, url } = req;
  const timestamp = new Date().toISOString();
  logger.info(`${timestamp} - ${method} ${url}`);
  next();
};

// Log errors
export const logError = (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  logger.error(`${timestamp} - Error: ${err.message} - ${err.stack}`);
  res.status(500).send({ message: 'Internal Server Error' });
};
