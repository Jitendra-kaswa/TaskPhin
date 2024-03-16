// server.js
require('dotenv').config();

(async ()=>{
    const db = require('./db');
    const { di } = require('./diContainer')
    const app = require('./app');

    const PORT = process.env.PORT || 3000;
    var isConnectionSuccessful = await db.connect()
    if (!isConnectionSuccessful) {
        di.logger.error('Database connection failed.');
        process.exit(1);
    }
    await db.createTables();
    app.listen(PORT, () => {
    di.logger.info(`Server is running on port ${PORT}`);
    });

})()