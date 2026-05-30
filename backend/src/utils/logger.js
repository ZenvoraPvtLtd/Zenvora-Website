// utils/logger.js
// Simple logger that prepends timestamps to messages.
// Used for temporary debugging; remove in production.

const logger = {
  info: (...args) => console.log(`[${new Date().toISOString()}] INFO:`, ...args),
  error: (...args) => console.error(`[${new Date().toISOString()}] ERROR:`, ...args),
};

module.exports = logger;
