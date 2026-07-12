# Student Attendance & Parent Portal App

A comprehensive full-stack application for managing student attendance with real-time parent notifications and portal access.

## Features

### Admin/Teacher Dashboard
- ✅ Mark student attendance (present/absent/leave)
- ✅ View attendance reports by class, date, or student
- ✅ Generate attendance statistics
- ✅ Manage student records and parent contacts
- ✅ Send notifications to parents

### Student Portal
- 📱 View personal attendance record
- 📅 Check attendance history
- 📊 View attendance statistics

### Parent Portal
- 👨‍👩‍👧 View child's attendance records
- 📬 Receive real-time notifications for absences
- 📞 Contact information for admin/teachers
- 📊 Attendance trends and reports
- 🔔 Notification preferences

### System Features
- 🔐 Role-based access control (Admin, Teacher, Student, Parent)
- 📧 Email notifications to parents
- 📱 SMS notifications (optional)
- 📊 Detailed analytics and reports
- 🔄 Real-time updates via Socket.io
- 📱 Responsive design (mobile-friendly)

## Tech Stack

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Socket.io** - Real-time communications
- **Nodemailer** - Email service
- **Bcryptjs** - Password hashing

### Frontend
- **React.js** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Chart.js** - Data visualization
- **Tailwind CSS** - Styling
- **Socket.io-client** - Real-time updates

## Quick Start

### Using Docker (Recommended)

```bash
git clone https://github.com/ipscmardan289-coder/student-attendance-app.git
cd student-attendance-app
docker-compose up -d
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

### Manual Setup

#### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

## Documentation

- [Setup Guide](docs/SETUP.md) - Complete installation instructions
- [API Documentation](docs/API.md) - All endpoints and usage
- [Database Schema](docs/DATABASE.md) - Data structure details

## Default Credentials (Development)

**Admin:**
- Email: `admin@example.com`
- Password: `admin123`

**Teacher:**
- Email: `teacher@example.com`
- Password: `teacher123`

**Parent:**
- Email: `parent@example.com`
- Password: `parent123`

## Project Structure

```
student-attendance-app/
├── backend/
│   ├── src/
│   │   ├── config/           # Database & config
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Auth & validation
│   │   ├── services/         # Services
│   │   ├── utils/            # Helper functions
│   │   └── server.js         # Entry point
│   ├── .env.example
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── redux/            # State management
│   │   ├── services/         # API calls
│   │   ├── types/            # TypeScript types
│   │   └── App.tsx           # Root component
│   ├── .env.example
│   ├── package.json
│   └── Dockerfile
├── docs/
│   ├── SETUP.md              # Setup guide
│   ├── API.md                # API docs
│   └── DATABASE.md           # Database schema
└── docker-compose.yml
```

## License

MIT License
