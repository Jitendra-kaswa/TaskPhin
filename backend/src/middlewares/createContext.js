// entryMiddleware.js
const { v4: uuidv4 } = require('uuid');

const createContext = (req, _, next) => {
  req.ctx = {
    traceId: uuidv4(),
    // Add other properties to the context object as needed
  };
  next();
};

module.exports = {
    createContext
}
