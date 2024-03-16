// logger.js
const fs = require('fs');

class Logger {
  constructor() {
    this.logFilePath = '/tmp/app.log';
  }

  static #instance;

  static getInstance() {
    if (!Logger.#instance) {
      Logger.#instance = new Logger();
    }
    return Logger.#instance;
  }

  info(message, tracrId = "server") {
    const logMessage = `[INFO - ${new Date().toISOString()}] | traceId : ${tracrId} | message : ${message}\n`;
    console.log(logMessage);
    fs.appendFileSync(this.logFilePath, logMessage);
  }

  error(message, tracrId = "server") {
    const errorMessage = `[ERROR - ${new Date().toISOString()}] | tractId : ${tracrId} | message : ${message}\n`;
    console.log(errorMessage)
    fs.appendFileSync(this.logFilePath, errorMessage);
  }
}

module.exports = {
    Logger
}
