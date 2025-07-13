# Student Management System (ERP)

A comprehensive ERP system for educational institutions built with React and Tailwind CSS.

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
