const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const studentRoutes = require('./routes/student.routes');
const facultyRoutes = require('./routes/faculty.routes');
const academicRoutes = require('./routes/academic.routes');
const financeRoutes = require('./routes/finance.routes');
const libraryRoutes = require('./routes/library.routes');
const inventoryRoutes = require('./routes/inventory.routes');
const hostelRoutes = require('./routes/hostel.routes');
const adminRoutes = require('./routes/admin.routes');
const { authenticateToken } = require('./middleware/auth.middleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', authenticateToken, studentRoutes);
app.use('/api/faculty', authenticateToken, facultyRoutes);
app.use('/api/academic', authenticateToken, academicRoutes);
app.use('/api/finance', authenticateToken, financeRoutes);
app.use('/api/library', authenticateToken, libraryRoutes);
app.use('/api/inventory', authenticateToken, inventoryRoutes);
app.use('/api/hostel', authenticateToken, hostelRoutes);
app.use('/api/admin', authenticateToken, adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
