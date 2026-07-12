# Setup Guide

## Prerequisites

- Node.js 16+ (Download from https://nodejs.org/)
- MongoDB 4.4+ (https://www.mongodb.com/try/download/community)
- Git (https://git-scm.com/)
- npm or yarn

## Docker Setup (Recommended)

### 1. Clone Repository
```bash
git clone https://github.com/ipscmardan289-coder/student-attendance-app.git
cd student-attendance-app
```

### 2. Run with Docker Compose
```bash
docker-compose up -d
```

Services will start on:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

### 3. Stop Services
```bash
docker-compose down
```

## Manual Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/attendance
JWT_SECRET=your-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CORS_ORIGIN=http://localhost:3000
```

Start MongoDB:
```bash
mongod
```

Start Backend:
```bash
npm run dev
```

### Frontend

In new terminal:
```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

Start Frontend:
```bash
npm start
```

App opens at http://localhost:3000

## Default Users (Development)

**Admin:**
- Email: admin@example.com
- Password: admin123

**Teacher:**
- Email: teacher@example.com
- Password: teacher123

**Parent:**
- Email: parent@example.com
- Password: parent123

## Troubleshooting

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongosh

# If using Docker
docker ps | grep mongo
```

### Port Already in Use
```bash
# Kill port 5000
lsof -ti:5000 | xargs kill -9

# Kill port 3000
lsof -ti:3000 | xargs kill -9
```

### CORS Issues
Ensure backend `.env` has correct CORS_ORIGIN:
```env
CORS_ORIGIN=http://localhost:3000
```
