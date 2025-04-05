const { createClient } = require('redis');

// Create and configure Redis client instance
const redis = createClient({
  url: 'redis://localhost:6379' // Default local Redis URL
});

// Log Redis connection errors
redis.on('error', (err) => console.error('[Redis Error]', err));

// Connect and log success
redis.connect().then(() => console.log('[Redis] Connected successfully'));

module.exports = redis;
