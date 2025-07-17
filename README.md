# 🧠 Beeyond-App-Backend

A Node.js + Express backend framework powering real-time, scalable business applications — built for the Beeyond Tech assignment.

---

## 🌐 Live Backend URL

- API Base URL: `http://51.20.157.181/api`
- WebSocket: `ws://51.20.157.181/socket.io`

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication
- Docker
- RESTful API design

---



---

## 🐳 Docker Setup

To build and run the backend in Docker:

### 1. Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

2. Build & Run
docker build -t beeyond-backend .
docker run -d -p 5000:5000 --env-file .env beeyond-backend


📡 WebSocket Events
Socket.IO is used to support real-time order communication.


✅ Health Check
You can verify server status using:

curl http://51.20.157.181/health
# Returns: OK
🔐 Authentication & Roles
JWT token authentication

Roles: admin, user, partner

Middleware to protect routes (authMiddleware.js)

📦 Installation (Non-Docker)
git clone https://github.com/Avadooth/Beeyond-App-Backend.git
cd Beeyond-App-Backend
npm install
npm run dev
Ensure you add your .env file with:


🙋 Author
Avadooth Joshi