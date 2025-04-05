const express = require('express');
const routes = require('./routes/conversation.routes');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Mount all conversation-related routes under /api
app.use('/api', routes);

// Middleware for handling unmatched routes (404 Not Found)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handling middleware
// Catches errors from anywhere in the route handlers or middlewares
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[Worker ${process.pid}] Server listening on port ${PORT}`);
});
