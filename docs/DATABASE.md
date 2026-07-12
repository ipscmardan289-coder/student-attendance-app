# Database Schema

## Collections Overview

### 1. Users
Base collection for all users (Admin, Teacher, Student, Parent)

```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  phoneNumber: String,
  password: String (hashed),
  role: Enum ['admin', 'teacher', 'student', 'parent'],
  avatar: String,
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Students
Student-specific information

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  rollNumber: String (unique),
  classId: ObjectId (ref: Classes),
  dateOfBirth: Date,
  address: String,
  parentIds: [ObjectId] (ref: Users),
  admissionDate: Date,
  bloodGroup: String,
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Parents
Parent/Guardian information

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  occupation: String,
  relationship: Enum ['mother', 'father', 'guardian'],
  childrenIds: [ObjectId] (ref: Students),
  notificationPreferences: {
    email: Boolean,
    sms: Boolean,
    push: Boolean,
    notifyOnAbsence: Boolean,
    notifyOnLeave: Boolean
  },
  addressProof: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Teachers
Teacher-specific information

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  employeeId: String (unique),
  qualification: String,
  specialization: String,
  classIds: [ObjectId] (ref: Classes),
  joiningDate: Date,
  department: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Classes
Class/Section information

```javascript
{
  _id: ObjectId,
  name: String,
  classCode: String (unique),
  grade: String,
  section: String,
  teacherIds: [ObjectId] (ref: Teachers),
  studentCount: Number,
  capacity: Number,
  academicYear: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Attendance
Daily attendance records

```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: Students),
  classId: ObjectId (ref: Classes),
  date: Date,
  status: Enum ['present', 'absent', 'leave', 'late'],
  markedBy: ObjectId (ref: Teachers),
  remarks: String,
  leaveType: Enum ['medical', 'personal', 'family', 'other'],
  documentPath: String,
  markedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 7. AttendanceReports
Aggregated attendance reports

```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: Students),
  classId: ObjectId (ref: Classes),
  month: Number,
  year: Number,
  totalDays: Number,
  presentDays: Number,
  absentDays: Number,
  leaveDays: Number,
  lateDays: Number,
  attendancePercentage: Number,
  generatedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 8. Notifications
Notification history

```javascript
{
  _id: ObjectId,
  parentId: ObjectId (ref: Parents),
  studentId: ObjectId (ref: Students),
  type: Enum ['absence', 'leave', 'alert', 'reminder'],
  title: String,
  message: String,
  notificationChannels: [Enum ['email', 'sms', 'push']],
  status: Enum ['pending', 'sent', 'failed'],
  sentAt: Date,
  readAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Relationships

```
Users
  ├─ Students (one-to-one via userId)
  ├─ Teachers (one-to-one via userId)
  ├─ Parents (one-to-one via userId)
  └─ Admin (implied by role)

Students
  ├─ User (reference)
  ├─ Class (many-to-one)
  ├─ Parents (many-to-many via parentIds)
  ├─ Attendance (one-to-many)
  └─ AttendanceReports (one-to-many)

Parents
  ├─ User (reference)
  ├─ Children (many-to-many via childrenIds)
  └─ Notifications (one-to-many)

Teachers
  ├─ User (reference)
  └─ Classes (many-to-many via classIds)

Classes
  ├─ Teachers (many-to-many via teacherIds)
  ├─ Students (one-to-many)
  └─ Attendance (one-to-many)
```
