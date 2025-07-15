# Student Management System (ERP)

A comprehensive ERP system for educational institutions built with React, Node.js, Express, MongoDB, and Tailwind CSS.

## Features

### Student Management
- Student registration and admission
- Student profile management
- Academic records tracking
- Attendance management

### Faculty Management
- Faculty records management
- Leave management
- Performance evaluation

### Academic Management
- Course management
- Class scheduling
- Examination management
- Results and transcripts

### Finance Management
- Fee collection
- Refund management
- Scholarship tracking

### Library Management
- Book inventory
- Issue/return tracking
- Penalty management
- Digital resources

### Inventory Management
- Equipment tracking
- Maintenance scheduling
- Purchase requests

### Hostel Management
- Room management
- Resident management
- Fee management
- Complaints and maintenance

### Administration
- User management
- System logs
- System settings
- Report generation

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=http://localhost:5000/api
MONGODB_URI=mongodb://localhost:27017/student-management-system
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

### Install dependencies and start the application

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ..
npm install

# Seed the database with sample data
cd backend
npm run seed

# Start the backend server
npm run dev

# In a new terminal, start the frontend
cd ..
npm run dev
```

## Seeding the Database

The application comes with a seed script to populate the database with sample data. This includes:

- Admin user (email: admin@example.com, password: password123)
- Students
- Faculty members
- Courses
- Books
- Hostels
- Departments

To seed the database:

```bash
cd backend
npm run seed
```

## Technology Stack

- **Frontend**: React, React Router, Tailwind CSS
- **State Management**: React Context API
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/student-management-system.git
cd student-management-system
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

- **Admin**: Username: admin, Password: admin123
- **Faculty**: Username: faculty, Password: faculty123
- **Student**: Username: student, Password: student123
- **Staff**: Username: staff, Password: staff123

## Project Structure

```
src/
├── components/         # UI components
│   ├── admin/          # Admin-related components
│   ├── auth/           # Authentication components
│   ├── common/         # Common/shared components
│   ├── dashboard/      # Dashboard components
│   ├── faculty/        # Faculty-related components
│   ├── finance/        # Finance-related components
│   ├── hostel/         # Hostel-related components
│   ├── inventory/      # Inventory-related components
│   ├── library/        # Library-related components
│   └── student/        # Student-related components
├── context/            # React context for state management
├── hooks/              # Custom React hooks
├── services/           # API services
├── utils/              # Utility functions
├── App.jsx             # Main application component
├── App.css             # Global styles
├── index.css           # Tailwind CSS imports
└── main.jsx            # Application entry point
```
