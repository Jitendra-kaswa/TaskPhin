const { Logger } = require('./utils/logger')
const { Pool } = require('pg')
const { dbConfig } = require('./config/database')

class DIContainer {
    constructor() {
        this.logger = Logger.getInstance();
        this.dbPool = new Pool(dbConfig);
    }
  }

module.exports = {
    di : new DIContainer(),
}
