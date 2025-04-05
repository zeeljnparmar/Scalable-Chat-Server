const cron = require('node-cron');
const conversationService = require('./services/conversationManager');

setInterval(() => {
  cleanupOldConversations();
}, 60 * 1000); // Every minute
