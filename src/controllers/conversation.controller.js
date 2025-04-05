const conversationService = require('../services/conversationManager');

// Middleware to validate required fields in message POST requests
function validateMessageRequest(req, res, next) {
  const { sender, content, timestamp } = req.body;
  if (!sender || !content || !timestamp) {
    return res.status(400).json({ error: 'Missing sender, content, or timestamp' });
  }
  next();
}

// Create a new conversation
async function createConversation(req, res, next) {
  try {
    const conversationId = await conversationService.createConversation();
    res.status(201).json({ conversationId });
  } catch (error) {
    next(error);
  }
}

// Add a message to a conversation
async function addMessage(req, res, next) {
  try {
    const { conversationId } = req.params;
    const { sender, content, timestamp } = req.body;
    const messageId = await conversationService.addMessage(conversationId, { sender, content, timestamp });
    res.status(201).json({ messageId });
  } catch (error) {
    next(error);
  }
}

// Get conversation messages
async function getConversation(req, res, next) {
  try {
    const { conversationId } = req.params;
    const messages = await conversationService.getConversation(conversationId);
    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
}

// Delete a specific message
async function deleteMessage(req, res, next) {
  try {
    const { conversationId, messageId } = req.params;
    await conversationService.deleteMessage(conversationId, messageId);
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateMessageRequest,
  createConversation,
  addMessage,
  getConversation,
  deleteMessage,
};
