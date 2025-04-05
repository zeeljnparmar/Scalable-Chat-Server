# 🗨️ Scalable Chat Server – Node.js Assignment

A scalable real-time chat server built using **Node.js**, **Express**, **Redis**, and **Clustering**. This project demonstrates managing in-memory conversations with RESTful APIs, automated cleanup of inactive chats, and scalable performance using multi-core CPUs.

---

## 🚀 Features

- Add & manage chat conversations in memory (Redis)
- REST APIs for sending/retrieving/deleting messages
- Auto cleanup of conversations inactive for 30 minutes
- Horizontal scalability with Node.js Cluster module
- Error-handled, modular, and production-ready codebase

---

## 🛠️ Setup Instructions

### Clone the Repo

```bash
git clone https://github.com/zeeljnparmar/Scalable-Chat-Server.git
cd Scalable-Chat-Server
```
## 🛠️ Setup Instructions

### 🧪 Example with curl
# Create a new conversation
curl -X POST http://localhost:3000/api/conversations

# Send a message
curl -X POST http://localhost:3000/api/conversations/<conversationId>/messages \
  -H "Content-Type: application/json" \
  -d '{"sender": "agent", "content": "Hello, how can I help?", "timestamp": "2025-04-05T14:01:00Z"}'

# Fetch messages
curl http://localhost:3000/api/conversations/<conversationId>

# Delete a message
curl -X DELETE http://localhost:3000/api/conversations/<conversationId>/messages/<messageId>
