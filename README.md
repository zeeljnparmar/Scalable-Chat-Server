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
### 📦 Notes
- sender field can be "customer" or "agent"
- All timestamps must follow ISO 8601 format (e.g. "2025-04-05T14:00:00Z")
- All messages are stored temporarily in Redis
- Conversations are automatically deleted after 30 minutes of inactivity


## 🛠️ Setup Instructions

### Clone the Repo

```bash
git clone https://github.com/zeeljnparmar/Scalable-Chat-Server.git
cd Scalable-Chat-Server
```
## 🛠️ Setup Instructions

### 🧪 Example with curl
```bash
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
```

## ✅ API Endpoints

### 🔹 1. Create a New Conversation
**Request:**
    `POST /api/conversations`
**Response:**

```json
{
  "conversationId": "c408c2c2-b3ef-4dc6-9f32-3dc41b9b2904"
}
```
### 🔹 2. Send a Message (Customer/Agent)
**Request:**
    `POST /api/conversations/:conversationId/messages`

**Body**

```json
{
  "sender": "customer",
  "content": "Hi, I need help!",
  "timestamp": "2025-04-05T14:00:00Z"
}
```
**Response:**

```json
{
  "message": "Message added successfully",
  "messageId": "1a2b3c4d-5e6f-7890-abcd-1234567890ef"
}
```

### 🔹 3. Get All Messages in a Conversation
**Request:**
    `GET /api/conversations/:conversationId`

**Response:**

```json
{
  "conversationId": "c408c2c2-b3ef-4dc6-9f32-3dc41b9b2904",
  "messages": [
    {
      "messageId": "1a2b3c4d-5e6f-7890-abcd-1234567890ef",
      "sender": "customer",
      "content": "Hi, I need help!",
      "timestamp": "2025-04-05T14:00:00Z"
    }
  ]
}
```
### 🔹 4. Delete a Message
**Request:**
    `DELETE /api/conversations/:conversationId/messages/:messageId`

**Response:**

```json
{
  "message": "Message deleted successfully"
}
```