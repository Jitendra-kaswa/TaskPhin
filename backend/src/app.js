// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { logRequest } = require('./middlewares/logRequest');
const { createContext }= require('./middlewares/createContext');
const candidateRouter = require('./routers/candidate');
const reportsRouter = require('./routers/reports');
const cors = require('cors')

const app = express();
app.use(cors({
    origin: '*'
  }));

// Middleware
app.use(createContext)
app.use(bodyParser.json());
app.use(logRequest);

// Routes
app.use('/candidates', candidateRouter);
app.use('/reports', reportsRouter)

module.exports = app
