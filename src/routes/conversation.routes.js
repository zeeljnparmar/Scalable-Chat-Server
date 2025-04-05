const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversation.controller');

// Route to create/start a new conversation
router.post(
  '/conversations',
  conversationController.createConversation
);

// Route to add a message to an existing conversation
router.post(
  '/conversations/:conversationId/messages',
  conversationController.validateMessageRequest,
  conversationController.addMessage
);

// Route to fetch conversation history
router.get(
  '/conversations/:conversationId',
  conversationController.getConversation
);

// Route to delete a specific message from a conversation
router.delete(
  '/conversations/:conversationId/messages/:messageId',
  conversationController.deleteMessage
);

module.exports = router;
