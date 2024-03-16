// db.js

const { di } = require('./diContainer')
const fs = require('fs')
const path = require('path')

async function connect() {
  let client;
  try {
    client = await di.dbPool.connect();
    di.logger.info('Connected to database');
    await client.query('SELECT 1');
    return true
  } catch (error) {
    di.logger.error('Error connecting to database:', error);
    if (client) {
      client.release();
    }
    return false;
  }
}

async function createTables() {
  try {
    const sqlScript = fs.readFileSync(path.join(__dirname, './models/candidate.sql'), 'utf8');
    await di.dbPool.query(sqlScript);
    di.logger.info('Tables created successfully');
  } catch (error) {
    di.logger.error(`Error creating tables: ${ error}`);
    throw error;
  }
}

module.exports = {
  connect,
  createTables,
};
