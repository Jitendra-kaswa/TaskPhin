const dbConfig = {
    connectionString: process.env.DB_URL,
    max: 10,
    ssl: {
      rejectUnauthorized: false
    }
  }

module.exports = {
    dbConfig
}