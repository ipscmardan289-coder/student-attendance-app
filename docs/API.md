# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Auth Endpoints

### Register
**POST** `/auth/register`
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "+1234567890",
  "role": "parent"
}
```

### Login
**POST** `/auth/login`
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Attendance Endpoints

### Mark Attendance
**POST** `/attendance/mark`
Requires: Teacher role

```json
{
  "classId": "class_id",
  "attendanceData": [
    {
      "studentId": "student_id",
      "status": "present",
      "remarks": "On time"
    }
  ],
  "date": "2024-07-12"
}
```

### Get Student Attendance
**GET** `/attendance/student/:studentId`

### Get Attendance Report
**GET** `/attendance/report?classId=&month=&year=`

## Student Endpoints

### List Students
**GET** `/students?classId=&page=1&limit=20`

### Get Student
**GET** `/students/:id`

### Create Student
**POST** `/students`
Requires: Admin/Teacher role

```json
{
  "firstName": "Alice",
  "lastName": "Johnson",
  "email": "alice@example.com",
  "rollNumber": "2024001",
  "classId": "class_id",
  "dateOfBirth": "2010-05-15",
  "parentIds": ["parent_id_1"],
  "address": "123 Main St"
}
```

### Update Student
**PUT** `/students/:id`

### Delete Student
**DELETE** `/students/:id`

## Parent Endpoints

### Get Parent Profile
**GET** `/parents/:id`

### Get Children
**GET** `/parents/:parentId/children`

### Get Child Attendance
**GET** `/parents/:parentId/children/:childId/attendance`

### Send Notification
**POST** `/parents/notify`

```json
{
  "parentId": "parent_id",
  "studentId": "student_id",
  "type": "absence",
  "message": "Your child was absent today",
  "channels": ["email"]
}
```

## Class Endpoints

### List Classes
**GET** `/classes`

### Get Class
**GET** `/classes/:id`

### Create Class
**POST** `/classes`
Requires: Admin role

```json
{
  "name": "Class 10-A",
  "classCode": "10A",
  "grade": "10",
  "section": "A",
  "capacity": 50
}
```
