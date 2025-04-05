const { v4: uuidv4 } = require('uuid');
const redisClient = require('../config/redisClient');

const CONVERSATION_TTL = 60 * 30; // 30 minutes in seconds

// Create a new conversation and store in Redis with TTL
async function createConversation() {
  try {
    const conversationId = uuidv4();
    await redisClient.set(`conversation:${conversationId}`, JSON.stringify([]), 'EX', CONVERSATION_TTL);
    return conversationId;
  } catch (error) {
    throw new Error(`Failed to create conversation: ${error.message}`);
  }
}

// Add a message to an existing conversation
 
async function addMessage(conversationId, message) {
  const conversationKey = `conversation:${conversationId}`;
  try {
    const existing = await redisClient.get(conversationKey);
    if (!existing) throw new Error('Conversation not found');

    const messages = JSON.parse(existing);
    const messageId = uuidv4();
    messages.push({ id: messageId, ...message });

    await redisClient.set(conversationKey, JSON.stringify(messages), 'EX', CONVERSATION_TTL);
    return messageId;
  } catch (error) {
    throw new Error(`Failed to add message: ${error.message}`);
  }
}

 // Retrieve all messages in a conversation

async function getConversation(conversationId) {
  const conversationKey = `conversation:${conversationId}`;
  try {
    const existing = await redisClient.get(conversationKey);
    if (!existing) throw new Error('Conversation not found');
    return JSON.parse(existing);
  } catch (error) {
    throw new Error(`Failed to get conversation: ${error.message}`);
  }
}

 // Delete a specific message from a conversation
async function deleteMessage(conversationId, messageId) {
  const conversationKey = `conversation:${conversationId}`;
  try {
    const existing = await redisClient.get(conversationKey);
    if (!existing) throw new Error('Conversation not found');

    let messages = JSON.parse(existing);
    const index = messages.findIndex(m => m.id === messageId);
    if (index === -1) throw new Error('Message not found');

    messages.splice(index, 1);
    await redisClient.set(conversationKey, JSON.stringify(messages), 'EX', CONVERSATION_TTL);
  } catch (error) {
    throw new Error(`Failed to delete message: ${error.message}`);
  }
}
const cleanupOldConversations = async () => {
  const keys = await redis.keys(PREFIX + '*');
  for (const key of keys) {
    const ttl = await redis.ttl(key);
    if (ttl <= 0) {
      await redis.del(key);
      console.log(`[CLEANUP] Removed expired conversation ${key}`);
    }
  }
};

module.exports = {
  createConversation,
  addMessage,
  getConversation,
  deleteMessage,cleanupOldConversations
};
