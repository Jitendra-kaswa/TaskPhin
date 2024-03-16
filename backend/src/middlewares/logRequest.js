// loggerMiddleware.js
const {di} = require('../diContainer');

const logRequest = (req, res, next) => {
  const logger = di.logger;
  const { method, url } = req;
  const traceId = req.ctx.traceId || 'unknown';
  logger.info(`Request Started: ${method} ${url}`, traceId);
  logger.info(`Request Headers: ${JSON.stringify(req.headers)}`, traceId);
  logger.info(`Request Body: ${JSON.stringify(req.body)}`, traceId);

  res.on('finish', () => {
    logger.info(`Request Completed: ${method} ${url} | Status: ${res.statusCode}`, traceId);
  });

  next();
};

module.exports = {
  logRequest
}