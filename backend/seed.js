const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/user.model");
const Student = require("./models/student.model");
const Faculty = require("./models/faculty.model");
const Course = require("./models/course.model");
const { Timetable, Exam, Assignment, Result } = require('./models/academic.model');
const Book = require("./models/book.model");
const Hostel = require("./models/hostel.model");
const LibraryTransaction = require("./models/library-transaction.model");
const Department = require("./models/department.model");

// Load environment variables from project root, regardless of where script is run
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "./.env") });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   serverSelectionTimeoutMS: 5000,
   retryWrites: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Connected to MongoDB");
});

// Clear existing data and drop old indexes
const clearDatabase = async () => {
   try {
      // Drop old 'code' index from courses collection if exists
      try {
         await Course.collection.dropIndex("code_1");
         console.log("Dropped old 'code' index from courses collection.");
      } catch (err) {
         if (err.codeName === "IndexNotFound") {
            console.log("No old 'code' index found on courses collection.");
         } else {
            console.warn("Error dropping 'code' index (may be safe to ignore):", err.message);
         }
      }
      // Drop old 'studentId' index from students collection if exists
      try {
         await Student.collection.dropIndex("studentId_1");
         console.log("Dropped old 'studentId' index from students collection.");
      } catch (err) {
         if (err.codeName === "IndexNotFound") {
            console.log("No old 'studentId' index found on students collection.");
         } else {
            console.warn("Error dropping 'studentId' index (may be safe to ignore):", err.message);
         }
      }
      await User.deleteMany({});
      await Student.deleteMany({});
      await Faculty.deleteMany({});
      await Course.deleteMany({});
      await Timetable.deleteMany({});
      await Exam.deleteMany({});
      await Assignment.deleteMany({});
      await Result.deleteMany({});
      await Book.deleteMany({});
      await Hostel.deleteMany({});
      await LibraryTransaction.deleteMany({});
      await Department.deleteMany({});
      console.log("Database cleared");
   } catch (error) {
      console.error("Error clearing database:", error);
      process.exit(1);
   }
};

// Seed Users
const seedUsers = async () => {
   try {
      const users = [
         {
            name: "Admin User",
            email: "admin@example.com",
            password: "admin123",
            role: "admin",
         },
         {
            name: "Faculty User",
            email: "faculty@example.com",
            password: "faculty123",
            role: "faculty",
         },
         {
            name: "Student User",
            email: "student@example.com",
            password: "student123",
            role: "student",
         },
         {
            name: "Staff User",
            email: "staff@example.com",
            password: "staff123",
            role: "staff",
         },
      ];

      const createdUsers = await User.create(users);
      console.log(`${createdUsers.length} users created`);
      return createdUsers;
   } catch (error) {
      console.error("Error seeding users:", error);
      process.exit(1);
   }
};

// Seed Courses
const seedCourses = async (departments) => {
   try {
      const departmentMap = departments.reduce((map, dept) => {
         map[dept.name] = dept._id;
         return map;
      }, {});

      const courses = [
         {
            courseCode: "CS101",
            name: "Introduction to Computer Science",
            description: "Fundamental concepts of computer science and programming",
            credits: 4,
            department: departmentMap["Computer Science"],
            semester: 1,
            syllabus: [
               { week: 1, topic: "Introduction to Computing", content: "History of computing, basic concepts" },
               { week: 2, topic: "Problem Solving", content: "Algorithms and problem-solving techniques" },
               { week: 3, topic: "Programming Basics", content: "Variables, data types, operators" },
            ],
            prerequisites: [],
            status: "Active",
         },
         {
            courseCode: "CS201",
            name: "Data Structures",
            description: "Study of data structures and algorithms",
            credits: 4,
            department: departmentMap["Computer Science"],
            semester: 3,
            syllabus: [
               { week: 1, topic: "Arrays and Linked Lists", content: "Implementation and operations" },
               { week: 2, topic: "Stacks and Queues", content: "Implementation and applications" },
               { week: 3, topic: "Trees and Graphs", content: "Binary trees, traversals, graph algorithms" },
            ],
            prerequisites: [],
            status: "Active",
         },
         {
            courseCode: "MATH101",
            name: "Calculus I",
            description: "Introduction to differential and integral calculus",
            credits: 3,
            department: departmentMap["Mathematics"],
            semester: 1,
            syllabus: [
               { week: 1, topic: "Limits and Continuity", content: "Definition and properties of limits" },
               { week: 2, topic: "Derivatives", content: "Rules of differentiation and applications" },
               { week: 3, topic: "Integration", content: "Indefinite and definite integrals" },
            ],
            prerequisites: [],
            status: "Active",
         },
         {
            courseCode: "ENG101",
            name: "English Composition",
            description: "Fundamentals of academic writing",
            credits: 3,
            department: departmentMap["English"],
            semester: 1,
            syllabus: [
               { week: 1, topic: "Grammar Review", content: "Parts of speech, sentence structure" },
               { week: 2, topic: "Essay Writing", content: "Thesis statements, paragraphs, transitions" },
               { week: 3, topic: "Research Methods", content: "Citations, sources, plagiarism" },
            ],
            prerequisites: [],
            status: "Active",
         },
         {
            courseCode: "PHYS101",
            name: "Physics I",
            description: "Introduction to mechanics and thermodynamics",
            credits: 4,
            department: departmentMap["Physics"],
            semester: 2,
            syllabus: [
               { week: 1, topic: "Kinematics", content: "Motion in one and two dimensions" },
               { week: 2, topic: "Newton's Laws", content: "Force, mass, acceleration relationships" },
               { week: 3, topic: "Energy", content: "Work, kinetic and potential energy, conservation" },
            ],
            prerequisites: [],
            status: "Active",
         },
      ];

      const createdCourses = await Course.create(courses);
      console.log(`${createdCourses.length} courses created`);
      return createdCourses;
   } catch (error) {
      console.error("Error seeding courses:", error);
      process.exit(1);
   }
};

// Seed Students
const seedStudents = async (courses) => {
   try {
      const students = [
         {
            registrationNumber: "23STU001",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            password: "password123",
            dateOfBirth: new Date("2000-01-15"),
            gender: "Male",
            contactNumber: "1234567890",
            address: {
               street: "123 College St",
               city: "University City",
               state: "CA",
               country: "USA",
               pincode: "12345",
            },
            course: courses[0]._id,
            batch: "2023",
            semester: 1,
            academicHistory: [
               {
                  semester: 1,
                  courses: [
                     {
                        course: courses[0]._id,
                        grade: "A",
                        credits: 4,
                     },
                     {
                        course: courses[2]._id,
                        grade: "B+",
                        credits: 3,
                     },
                     {
                        course: courses[3]._id,
                        grade: "A-",
                        credits: 3,
                     },
                  ],
                  gpa: 3.7,
               },
            ],
            cgpa: 3.7,
            fees: [
               {
                  semester: 1,
                  amount: 5000,
                  paid: true,
                  dueDate: new Date("2023-08-15"),
                  transactionId: "TXN123456",
                  paymentDate: new Date("2023-08-10"),
                  paymentMode: "Online",
               },
            ],
            status: "Active",
         },
         {
            registrationNumber: "23STU002",
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            password: "password123",
            dateOfBirth: new Date("2001-05-20"),
            gender: "Female",
            contactNumber: "9876543210",
            address: {
               street: "456 University Ave",
               city: "College Town",
               state: "NY",
               country: "USA",
               pincode: "54321",
            },
            course: courses[1]._id,
            batch: "2023",
            semester: 3,
            academicHistory: [
               {
                  semester: 1,
                  courses: [
                     {
                        course: courses[0]._id,
                        grade: "A+",
                        credits: 4,
                     },
                     {
                        course: courses[2]._id,
                        grade: "A",
                        credits: 3,
                     },
                     {
                        course: courses[3]._id,
                        grade: "A",
                        credits: 3,
                     },
                  ],
                  gpa: 4.0,
               },
               {
                  semester: 2,
                  courses: [
                     {
                        course: courses[4]._id,
                        grade: "A-",
                        credits: 4,
                     },
                  ],
                  gpa: 3.7,
               },
            ],
            cgpa: 3.85,
            fees: [
               {
                  semester: 1,
                  amount: 5000,
                  paid: true,
                  dueDate: new Date("2023-01-15"),
                  transactionId: "TXN123457",
                  paymentDate: new Date("2023-01-10"),
                  paymentMode: "Online",
               },
               {
                  semester: 2,
                  amount: 5000,
                  paid: true,
                  dueDate: new Date("2023-06-15"),
                  transactionId: "TXN123458",
                  paymentDate: new Date("2023-06-12"),
                  paymentMode: "Online",
               },
               {
                  semester: 3,
                  amount: 5000,
                  paid: false,
                  dueDate: new Date("2024-01-15"),
                  transactionId: null,
                  paymentDate: null,
                  // Remove paymentMode for unpaid fees
               },
            ],
            status: "Active",
         },
         {
            registrationNumber: "22STU001",
            firstName: "Michael",
            lastName: "Johnson",
            email: "michael.johnson@example.com",
            password: "password123",
            dateOfBirth: new Date("1999-11-08"),
            gender: "Male",
            contactNumber: "5551234567",
            address: {
               street: "789 Campus Rd",
               city: "Academic City",
               state: "TX",
               country: "USA",
               pincode: "67890",
            },
            course: courses[4]._id,
            batch: "2022",
            semester: 4,
            academicHistory: [
               {
                  semester: 1,
                  courses: [
                     {
                        course: courses[0]._id,
                        grade: "B+",
                        credits: 4,
                     },
                     {
                        course: courses[2]._id,
                        grade: "A",
                        credits: 3,
                     },
                     {
                        course: courses[3]._id,
                        grade: "B",
                        credits: 3,
                     },
                  ],
                  gpa: 3.4,
               },
               {
                  semester: 2,
                  courses: [
                     {
                        course: courses[4]._id,
                        grade: "B+",
                        credits: 4,
                     },
                  ],
                  gpa: 3.3,
               },
               {
                  semester: 3,
                  courses: [
                     {
                        course: courses[1]._id,
                        grade: "A-",
                        credits: 4,
                     },
                  ],
                  gpa: 3.7,
               },
            ],
            cgpa: 3.47,
            fees: [
               {
                  semester: 1,
                  amount: 5000,
                  paid: true,
                  dueDate: new Date("2022-08-15"),
                  transactionId: "TXN123459",
                  paymentDate: new Date("2022-08-05"),
                  paymentMode: "Online",
               },
               {
                  semester: 2,
                  amount: 5000,
                  paid: true,
                  dueDate: new Date("2023-01-15"),
                  transactionId: "TXN123460",
                  paymentDate: new Date("2023-01-10"),
                  paymentMode: "Online",
               },
               {
                  semester: 3,
                  amount: 5000,
                  paid: true,
                  dueDate: new Date("2023-06-15"),
                  transactionId: "TXN123461",
                  paymentDate: new Date("2023-06-14"),
                  paymentMode: "Online",
               },
               {
                  semester: 4,
                  amount: 5000,
                  paid: false,
                  dueDate: new Date("2024-01-15"),
                  transactionId: null,
                  paymentDate: null,
                  // Remove paymentMode for unpaid fees
               },
            ],
            status: "Active",
         },
      ];

      const createdStudents = await Student.create(students);
      console.log(`${createdStudents.length} students created`);
      return createdStudents;
   } catch (error) {
      console.error("Error seeding students:", error);
      process.exit(1);
   }
};

// Seed Faculty
const seedFaculty = async (courses, departments) => {
   try {
      const departmentMap = departments.reduce((map, dept) => {
         map[dept.name] = dept._id;
         return map;
      }, {});

      const faculty = [
         {
            employeeId: "23FAC001",
            firstName: "Robert",
            lastName: "Brown",
            email: "robert.brown@example.com",
            password: "password123",
            dateOfBirth: new Date("1975-03-12"),
            gender: "Male",
            contactNumber: "1112223333",
            address: {
               street: "101 Faculty Housing",
               city: "University City",
               state: "CA",
               country: "USA",
               pincode: "12345",
            },
            department: departmentMap["Computer Science"],
            designation: "Professor",
            joiningDate: new Date("2015-07-01"),
            qualifications: [
               {
                  degree: "Ph.D",
                  institution: "Stanford University",
                  year: 2010,
                  specialization: "Computer Science",
               },
               {
                  degree: "M.S.",
                  institution: "MIT",
                  year: 2005,
                  specialization: "Computer Science",
               },
            ],
            expertise: ["Algorithms", "Data Structures", "Machine Learning"],
            coursesTeaching: [
               {
                  course: courses[0]._id,
                  semester: 1,
                  batch: "2023",
                  academicYear: "2023-2024",
               },
               {
                  course: courses[1]._id,
                  semester: 3,
                  batch: "2022",
                  academicYear: "2023-2024",
               },
            ],
            status: "Active",
         },
         {
            employeeId: "23FAC002",
            firstName: "Sarah",
            lastName: "Wilson",
            email: "sarah.wilson@example.com",
            password: "password123",
            dateOfBirth: new Date("1980-11-25"),
            gender: "Female",
            contactNumber: "4445556666",
            address: {
               street: "202 Faculty Housing",
               city: "University City",
               state: "CA",
               country: "USA",
               pincode: "12345",
            },
            department: departmentMap["Mathematics"],
            designation: "Associate Professor",
            joiningDate: new Date("2018-01-15"),
            qualifications: [
               {
                  degree: "Ph.D",
                  institution: "Harvard University",
                  year: 2015,
                  specialization: "Applied Mathematics",
               },
               {
                  degree: "M.S.",
                  institution: "Princeton University",
                  year: 2010,
                  specialization: "Mathematics",
               },
            ],
            expertise: ["Calculus", "Linear Algebra", "Differential Equations"],
            coursesTeaching: [
               {
                  course: courses[2]._id,
                  semester: 1,
                  batch: "2023",
                  academicYear: "2023-2024",
               },
            ],
            status: "Active",
         },
         {
            employeeId: "22FAC001",
            firstName: "David",
            lastName: "Miller",
            email: "david.miller@example.com",
            password: "password123",
            dateOfBirth: new Date("1978-07-18"),
            gender: "Male",
            contactNumber: "7778889999",
            address: {
               street: "303 Faculty Housing",
               city: "University City",
               state: "CA",
               country: "USA",
               pincode: "12345",
            },
            department: departmentMap["Physics"],
            designation: "Assistant Professor",
            joiningDate: new Date("2020-08-01"),
            qualifications: [
               {
                  degree: "Ph.D",
                  institution: "Caltech",
                  year: 2018,
                  specialization: "Theoretical Physics",
               },
               {
                  degree: "M.S.",
                  institution: "UC Berkeley",
                  year: 2013,
                  specialization: "Physics",
               },
            ],
            expertise: ["Mechanics", "Thermodynamics", "Quantum Physics"],
            coursesTeaching: [
               {
                  course: courses[4]._id,
                  semester: 2,
                  batch: "2023",
                  academicYear: "2023-2024",
               },
            ],
            status: "Active",
         },
      ];

      const createdFaculty = await Faculty.create(faculty);
      console.log(`${createdFaculty.length} faculty members created`);
      return createdFaculty;
   } catch (error) {
      console.error("Error seeding faculty:", error);
      process.exit(1);
   }
};

// Seed Books
const seedBooks = async (departments) => {
   // Create a map of department names to department IDs
   const departmentMap = departments.reduce((map, dept) => {
      map[dept.name] = dept._id;
      return map;
   }, {});
   try {
      const books = [
         {
            isbn: "9780262033848",
            title: "Introduction to Algorithms",
            authors: ["Thomas H. Cormen", "Charles E. Leiserson", "Ronald L. Rivest", "Clifford Stein"],
            publisher: "MIT Press",
            edition: "3rd",
            publicationYear: 2009,
            category: "Computer Science",
            subCategory: "Algorithms",
            description: "A comprehensive introduction to the modern study of computer algorithms",
            department: departmentMap["Computer Science"],
            location: {
               shelf: "CS Section",
               row: "3",
               section: "A",
            },
            copies: [
               {
                  barcode: "B00001",
                  status: "Available",
                  condition: "Good",
                  purchaseDate: new Date("2020-01-15"),
                  price: 80,
               },
               {
                  barcode: "B00002",
                  status: "Available",
                  condition: "Good",
                  purchaseDate: new Date("2020-01-15"),
                  price: 80,
               },
            ],
            status: "Active",
         },
         {
            isbn: "9780134685991",
            title: "Effective Java",
            authors: ["Joshua Bloch"],
            publisher: "Addison-Wesley Professional",
            edition: "3rd",
            publicationYear: 2018,
            category: "Computer Science",
            subCategory: "Programming",
            description: "Best practices for the Java platform",
            department: departmentMap["Computer Science"],
            location: {
               shelf: "CS Section",
               row: "2",
               section: "B",
            },
            copies: [
               {
                  barcode: "B00003",
                  status: "Available",
                  condition: "Good",
                  purchaseDate: new Date("2020-02-15"),
                  price: 60,
               },
               {
                  barcode: "B00004",
                  status: "Available",
                  condition: "Good",
                  purchaseDate: new Date("2020-02-15"),
                  price: 60,
               },
            ],
         },
         {
            isbn: "9780321751041",
            title: "Calculus: Early Transcendentals",
            authors: ["James Stewart"],
            publisher: "Cengage Learning",
            edition: "7th",
            publicationYear: 2012,
            category: "Mathematics",
            subCategory: "Calculus",
            description: "A comprehensive calculus textbook",
            department: departmentMap["Mathematics"],
            location: {
               shelf: "Math Section",
               row: "1",
               section: "A",
            },
            copies: [
               {
                  barcode: "B00005",
                  status: "Available",
                  condition: "Good",
                  purchaseDate: new Date("2019-05-10"),
                  price: 75,
               },
               {
                  barcode: "B00006",
                  status: "Available",
                  condition: "Good",
                  purchaseDate: new Date("2019-05-10"),
                  price: 75,
               },
            ],
         },
         {
            isbn: "9780393602104",
            title: "They Say / I Say: The Moves That Matter in Academic Writing",
            authors: ["Gerald Graff", "Cathy Birkenstein"],
            publisher: "W. W. Norton & Company",
            edition: "4th",
            publicationYear: 2018,
            category: "English",
            subCategory: "Composition",
            description: "A guide to academic writing",
            department: departmentMap["English"],
            location: {
               shelf: "English Section",
               row: "4",
               section: "C",
            },
            copies: [
               {
                  barcode: "B00007",
                  status: "Available",
                  condition: "Good",
                  purchaseDate: new Date("2020-03-20"),
                  price: 45,
               },
               {
                  barcode: "B00008",
                  status: "Available",
                  condition: "Good",
                  purchaseDate: new Date("2020-03-20"),
                  price: 45,
               },
            ],
         },
         {
            isbn: "9780321976444",
            title: "University Physics with Modern Physics",
            authors: ["Hugh D. Young", "Roger A. Freedman"],
            publisher: "Pearson",
            edition: "14th",
            publicationYear: 2015,
            category: "Physics",
            subCategory: "Physics",
            description: "A comprehensive physics textbook",
            department: departmentMap["Physics"],
            location: {
               shelf: "Physics Section",
               row: "2",
               section: "D",
            },
            copies: [
               {
                  barcode: "B00009",
                  status: "Available",
                  condition: "Good",
                  purchaseDate: new Date("2019-08-15"),
                  price: 90,
               },
               {
                  barcode: "B00010",
                  status: "Available",
                  condition: "Good",
                  purchaseDate: new Date("2019-08-15"),
                  price: 90,
               },
            ],
         },
      ];

      const createdBooks = await Book.create(books);
      console.log(`${createdBooks.length} books created`);
      return createdBooks;
   } catch (error) {
      console.error("Error seeding books:", error);
      process.exit(1);
   }
};

// Seed Hostels
const seedHostels = async () => {
   try {
      const hostels = [
         {
            name: "North Campus Residence",
            type: "Boys",
            totalCapacity: 200,
            location: {
               building: "North Campus Building",
               campus: "North Campus",
               address: {
                  street: "100 North Campus Drive",
                  city: "University City",
                  state: "CA",
                  country: "USA",
                  pincode: "12345",
               },
            },
            amenities: ["Wi-Fi", "Gym", "Study Room", "Laundry", "Cafeteria"],
            rooms: [
               {
                  roomNumber: "A101",
                  floor: 1,
                  type: "Single",
                  capacity: 1,
                  currentOccupancy: 1,
                  status: "Occupied",
               },
               {
                  roomNumber: "A102",
                  floor: 1,
                  type: "Double",
                  capacity: 2,
                  currentOccupancy: 2,
                  status: "Occupied",
               },
               {
                  roomNumber: "A103",
                  floor: 1,
                  type: "Single",
                  capacity: 1,
                  currentOccupancy: 0,
                  status: "Available",
               },
            ],
            wardens: [
               {
                  name: "John Smith",
                  contactNumber: "555-1234",
                  email: "john.smith@university.edu",
                  shift: "Morning",
               },
               {
                  name: "Michael Johnson",
                  contactNumber: "555-5678",
                  email: "michael.johnson@university.edu",
                  shift: "Night",
               },
            ],
            facilities: {
               messHall: {
                  capacity: 100,
                  timings: [
                     {
                        meal: "Breakfast",
                        startTime: "07:00",
                        endTime: "09:00",
                     },
                     {
                        meal: "Lunch",
                        startTime: "12:00",
                        endTime: "14:00",
                     },
                     {
                        meal: "Dinner",
                        startTime: "18:00",
                        endTime: "20:00",
                     },
                  ],
               },
               commonRoom: {
                  available: true,
                  facilities: ["TV", "Table Tennis", "Chess"],
               },
               laundry: {
                  available: true,
                  charges: 50,
               },
               security: {
                  guards: 3,
                  cctv: true,
                  visitorLog: true,
               },
            },
            mess: {
               contractor: {
                  name: "University Catering Services",
                  contactNumber: "555-9876",
                  email: "catering@university.edu",
                  contractStartDate: new Date("2023-01-01"),
                  contractEndDate: new Date("2023-12-31"),
               },
               menu: [
                  {
                     day: "Monday",
                     meals: [
                        {
                           type: "Breakfast",
                           items: ["Eggs", "Toast", "Cereal", "Milk", "Fruit"],
                        },
                        {
                           type: "Lunch",
                           items: ["Sandwich", "Soup", "Salad", "Juice"],
                        },
                        {
                           type: "Dinner",
                           items: ["Pasta", "Garlic Bread", "Vegetables", "Ice Cream"],
                        },
                     ],
                  },
               ],
               fees: {
                  monthly: 3000,
                  daily: 100,
               },
            },
            fees: {
               roomRent: {
                  amount: 5000,
                  frequency: "Semester",
               },
               securityDeposit: 10000,
               otherCharges: [
                  {
                     name: "Maintenance",
                     amount: 1000,
                     frequency: "Yearly",
                  },
                  {
                     name: "Internet",
                     amount: 500,
                     frequency: "Semester",
                  },
               ],
            },
            rules: [
               {
                  title: "Curfew",
                  description: "All students must return to the hostel by 10:00 PM",
                  penalty: "Written warning for first offense, fine for subsequent offenses",
               },
               {
                  title: "Visitors",
                  description: "Visitors allowed only in common areas between 9:00 AM and 8:00 PM",
                  penalty: "Restriction of visitor privileges",
               },
            ],
            status: "Operational",
         },
         {
            name: "South Campus Residence",
            type: "Girls",
            totalCapacity: 150,
            location: {
               building: "South Campus Building",
               campus: "South Campus",
               address: {
                  street: "200 South Campus Drive",
                  city: "University City",
                  state: "CA",
                  country: "USA",
                  pincode: "12345",
               },
            },
            amenities: ["Wi-Fi", "Study Room", "Laundry", "Garden", "Common Room"],
            rooms: [
               {
                  roomNumber: "B101",
                  floor: 1,
                  type: "Single",
                  capacity: 1,
                  currentOccupancy: 1,
                  status: "Occupied",
               },
               {
                  roomNumber: "B102",
                  floor: 1,
                  type: "Double",
                  capacity: 2,
                  currentOccupancy: 1,
                  status: "Occupied",
               },
               {
                  roomNumber: "B103",
                  floor: 1,
                  type: "Single",
                  capacity: 1,
                  currentOccupancy: 0,
                  status: "Available",
               },
            ],
            wardens: [
               {
                  name: "Sarah Johnson",
                  contactNumber: "555-4321",
                  email: "sarah.johnson@university.edu",
                  shift: "Morning",
               },
               {
                  name: "Emily Davis",
                  contactNumber: "555-8765",
                  email: "emily.davis@university.edu",
                  shift: "Night",
               },
            ],
            facilities: {
               messHall: {
                  capacity: 80,
                  timings: [
                     {
                        meal: "Breakfast",
                        startTime: "07:30",
                        endTime: "09:30",
                     },
                     {
                        meal: "Lunch",
                        startTime: "12:30",
                        endTime: "14:30",
                     },
                     {
                        meal: "Dinner",
                        startTime: "18:30",
                        endTime: "20:30",
                     },
                  ],
               },
               commonRoom: {
                  available: true,
                  facilities: ["TV", "Board Games", "Reading Area"],
               },
               laundry: {
                  available: true,
                  charges: 40,
               },
               security: {
                  guards: 2,
                  cctv: true,
                  visitorLog: true,
               },
            },
            mess: {
               contractor: {
                  name: "Healthy Meals Inc.",
                  contactNumber: "555-6543",
                  email: "contact@healthymeals.com",
                  contractStartDate: new Date("2023-01-01"),
                  contractEndDate: new Date("2023-12-31"),
               },
               menu: [
                  {
                     day: "Monday",
                     meals: [
                        {
                           type: "Breakfast",
                           items: ["Oatmeal", "Fruit", "Yogurt", "Tea", "Coffee"],
                        },
                        {
                           type: "Lunch",
                           items: ["Salad", "Soup", "Bread", "Fruit Juice"],
                        },
                        {
                           type: "Dinner",
                           items: ["Rice", "Curry", "Vegetables", "Dessert"],
                        },
                     ],
                  },
               ],
               fees: {
                  monthly: 2800,
                  daily: 95,
               },
            },
            fees: {
               roomRent: {
                  amount: 4500,
                  frequency: "Semester",
               },
               securityDeposit: 9000,
               otherCharges: [
                  {
                     name: "Maintenance",
                     amount: 900,
                     frequency: "Yearly",
                  },
                  {
                     name: "Internet",
                     amount: 450,
                     frequency: "Semester",
                  },
               ],
            },
            rules: [
               {
                  title: "Curfew",
                  description: "All students must return to the hostel by 9:00 PM",
                  penalty: "Written warning for first offense, fine for subsequent offenses",
               },
               {
                  title: "Visitors",
                  description: "Visitors allowed only in common areas between 10:00 AM and 7:00 PM",
                  penalty: "Restriction of visitor privileges",
               },
            ],
            status: "Operational",
         },
      ];

      const createdHostels = await Hostel.create(hostels);
      console.log(`${createdHostels.length} hostels created`);
      return createdHostels;
   } catch (error) {
      console.error("Error seeding hostels:", error);
      process.exit(1);
   }
};

// Seed Library Transactions
const seedLibraryTransactions = async (students, books) => {
   try {
      const transactions = [
         {
            transactionId: "LIB-2023-001",
            type: "Issue",
            user: {
               id: students[0]._id,
               type: "Student",
               name: `${students[0].firstName} ${students[0].lastName}`,
               contactNumber: students[0].contactNumber,
            },
            book: {
               id: books[0]._id,
               copyBarcode: books[0].copies[0].barcode,
               title: books[0].title,
               isbn: books[0].isbn,
            },
            dates: {
               transactionDate: new Date("2023-09-01"),
               issueDate: new Date("2023-09-01"),
               dueDate: new Date("2023-09-15"),
               returnDate: null,
            },
            status: "Active",
            processedBy: students[0]._id, // Using student ID as a placeholder for admin
         },
         {
            transactionId: "LIB-2023-002",
            type: "Return",
            user: {
               id: students[1]._id,
               type: "Student",
               name: `${students[1].firstName} ${students[1].lastName}`,
               contactNumber: students[1].contactNumber,
            },
            book: {
               id: books[1]._id,
               copyBarcode: books[1].copies[0].barcode,
               title: books[1].title,
               isbn: books[1].isbn,
            },
            dates: {
               transactionDate: new Date("2023-09-07"),
               issueDate: new Date("2023-08-25"),
               dueDate: new Date("2023-09-08"),
               returnDate: new Date("2023-09-07"),
            },
            status: "Completed",
            processedBy: students[1]._id, // Using student ID as a placeholder for admin
         },
         {
            transactionId: "LIB-2023-003",
            type: "Issue",
            user: {
               id: students[2]._id,
               type: "Student",
               name: `${students[2].firstName} ${students[2].lastName}`,
               contactNumber: students[2].contactNumber,
            },
            book: {
               id: books[2]._id,
               copyBarcode: books[2].copies[0].barcode,
               title: books[2].title,
               isbn: books[2].isbn,
            },
            dates: {
               transactionDate: new Date("2023-09-05"),
               issueDate: new Date("2023-09-05"),
               dueDate: new Date("2023-09-19"),
               returnDate: null,
            },
            status: "Active",
            processedBy: students[2]._id, // Using student ID as a placeholder for admin
         },
         {
            transactionId: "LIB-2023-004",
            type: "Reserve",
            user: {
               id: students[0]._id,
               type: "Student",
               name: `${students[0].firstName} ${students[0].lastName}`,
               contactNumber: students[0].contactNumber,
            },
            book: {
               id: books[3]._id,
               copyBarcode: books[3].copies[0].barcode,
               title: books[3].title,
               isbn: books[3].isbn,
            },
            dates: {
               transactionDate: new Date(),
            },
            reservation: {
               status: "Active",
               notificationSent: false,
               validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Valid for 7 days
            },
            status: "Pending",
            processedBy: students[0]._id, // Using student ID as a placeholder for admin
         },
      ];

      const createdTransactions = await LibraryTransaction.create(transactions);
      console.log(`${createdTransactions.length} library transactions created`);
      return createdTransactions;
   } catch (error) {
      console.error("Error seeding library transactions:", error);
      process.exit(1);
   }
};

// Seed Departments
const seedDepartments = async () => {
   try {
      const departments = [
         {
            name: "Computer Science",
            code: "CS",
            description: "Department of Computer Science and Engineering",
            establishedDate: new Date("2000-01-01"),
            contactInfo: {
               email: "cs@university.edu",
               phone: "123-456-7890",
               location: {
                  building: "Tech Building",
                  floor: "3",
                  roomNumber: "301",
               },
            },
            status: "Active",
         },
         {
            name: "Mathematics",
            code: "MATH",
            description: "Department of Mathematics",
            establishedDate: new Date("1995-01-01"),
            contactInfo: {
               email: "math@university.edu",
               phone: "123-456-7891",
               location: {
                  building: "Science Building",
                  floor: "2",
                  roomNumber: "201",
               },
            },
            status: "Active",
         },
         {
            name: "Physics",
            code: "PHYS",
            description: "Department of Physics",
            establishedDate: new Date("1998-01-01"),
            contactInfo: {
               email: "physics@university.edu",
               phone: "123-456-7892",
               location: {
                  building: "Science Building",
                  floor: "1",
                  roomNumber: "101",
               },
            },
            status: "Active",
         },
         {
            name: "English",
            code: "ENG",
            description: "Department of English",
            establishedDate: new Date("1990-01-01"),
            contactInfo: {
               email: "english@university.edu",
               phone: "123-456-7893",
               location: {
                  building: "Humanities Building",
                  floor: "2",
                  roomNumber: "201",
               },
            },
            status: "Active",
         },
      ];

      const createdDepartments = await Department.create(departments);
      console.log(`${createdDepartments.length} departments created`);
      return createdDepartments;
   } catch (error) {
      console.error("Error seeding departments:", error);
      process.exit(1);
   }
};

// Seed Timetables/Schedules
const seedTimetables = async (courses) => {
   try {
      const timetables = [
         {
            day: "Monday",
            startTime: "09:00",
            endTime: "10:30",
            courseCode: "CS101",
            room: "Room 101",
            batch: "2024-CS-A"
         },
         {
            day: "Monday",
            startTime: "11:00",
            endTime: "12:30",
            courseCode: "MATH101",
            room: "Room 201",
            batch: "2024-CS-A"
         },
         {
            day: "Tuesday",
            startTime: "09:00",
            endTime: "10:30",
            courseCode: "ENG101",
            room: "Room 301",
            batch: "2024-CS-A"
         },
         {
            day: "Tuesday",
            startTime: "14:00",
            endTime: "15:30",
            courseCode: "CS201",
            room: "Lab 1",
            batch: "2024-CS-B"
         },
         {
            day: "Wednesday",
            startTime: "09:00",
            endTime: "10:30",
            courseCode: "PHYS101",
            room: "Physics Lab",
            batch: "2024-CS-A"
         },
         {
            day: "Thursday",
            startTime: "11:00",
            endTime: "12:30",
            courseCode: "CS101",
            room: "Room 101",
            batch: "2024-CS-B"
         },
         {
            day: "Friday",
            startTime: "09:00",
            endTime: "10:30",
            courseCode: "CS201",
            room: "Lab 2",
            batch: "2024-CS-A"
         }
      ];

      const createdTimetables = await Timetable.create(timetables);
      console.log(`${createdTimetables.length} timetable entries created`);
      return createdTimetables;
   } catch (error) {
      console.error('Error seeding timetables:', error);
      process.exit(1);
   }
};

// Seed Examinations
const seedExams = async (courses) => {
   try {
      const exams = [
         {
            examName: "Mid-term Examination",
            courseCode: "CS101",
            date: new Date("2024-03-15"),
            startTime: "09:00",
            endTime: "12:00",
            venue: "Exam Hall A",
            maxMarks: 100
         },
         {
            examName: "Final Examination",
            courseCode: "CS101",
            date: new Date("2024-05-20"),
            startTime: "09:00",
            endTime: "12:00",
            venue: "Exam Hall B",
            maxMarks: 100
         },
         {
            examName: "Mid-term Examination",
            courseCode: "MATH101",
            date: new Date("2024-03-18"),
            startTime: "14:00",
            endTime: "17:00",
            venue: "Exam Hall C",
            maxMarks: 100
         },
         {
            examName: "Quiz 1",
            courseCode: "ENG101",
            date: new Date("2024-02-10"),
            startTime: "10:00",
            endTime: "11:00",
            venue: "Room 301",
            maxMarks: 25
         },
         {
            examName: "Lab Practical",
            courseCode: "PHYS101",
            date: new Date("2024-04-05"),
            startTime: "14:00",
            endTime: "17:00",
            venue: "Physics Lab",
            maxMarks: 50
         }
      ];

      const createdExams = await Exam.create(exams);
      console.log(`${createdExams.length} examinations created`);
      return createdExams;
   } catch (error) {
      console.error('Error seeding examinations:', error);
      process.exit(1);
   }
};

// Seed Assignments
const seedAssignments = async (courses, faculty) => {
   try {
      // Ensure we have faculty members
      if (!faculty || faculty.length === 0) {
         console.log('No faculty members found, skipping assignments');
         return [];
      }

      const assignments = [
         {
            title: "Programming Assignment 1",
            description: "Write a program to implement basic sorting algorithms",
            courseCode: "CS101",
            assignedBy: faculty[0]._id,
            dueDate: new Date("2024-02-28"),
            maxMarks: 50,
            status: "Active"
         },
         {
            title: "Data Structures Project",
            description: "Implement a binary search tree with all operations",
            courseCode: "CS201",
            assignedBy: faculty[0]._id,
            dueDate: new Date("2024-03-30"),
            maxMarks: 100,
            status: "Active"
         },
         {
            title: "Calculus Problem Set",
            description: "Solve integration and differentiation problems",
            courseCode: "MATH101",
            assignedBy: faculty[1] ? faculty[1]._id : faculty[0]._id,
            dueDate: new Date("2024-02-25"),
            maxMarks: 75,
            status: "Completed"
         },
         {
            title: "Essay Writing",
            description: "Write a 1000-word essay on modern literature",
            courseCode: "ENG101",
            assignedBy: faculty[2] ? faculty[2]._id : faculty[0]._id,
            dueDate: new Date("2024-03-10"),
            maxMarks: 60,
            status: "Active"
         },
         {
            title: "Physics Lab Report",
            description: "Submit detailed lab report on mechanics experiment",
            courseCode: "PHYS101",
            assignedBy: faculty[faculty.length - 1]._id,
            dueDate: new Date("2024-03-20"),
            maxMarks: 40,
            status: "Active"
         }
      ];

      const createdAssignments = await Assignment.create(assignments);
      console.log(`${createdAssignments.length} assignments created`);
      return createdAssignments;
   } catch (error) {
      console.error('Error seeding assignments:', error);
      process.exit(1);
   }
};

// Seed Results
const seedResults = async (students, courses) => {
   try {
      const results = [
         {
            studentId: students[0]._id,
            courseCode: "CS101",
            examType: "Midterm",
            examName: "Mid-term Examination",
            marksObtained: 85,
            maxMarks: 100,
            grade: "A",
            semester: "Fall 2024",
            academicYear: "2024-25"
         },
         {
            studentId: students[0]._id,
            courseCode: "MATH101",
            examType: "Assignment",
            examName: "Calculus Problem Set",
            marksObtained: 70,
            maxMarks: 75,
            grade: "A",
            semester: "Fall 2024",
            academicYear: "2024-25"
         },
         {
            studentId: students[1]._id,
            courseCode: "CS101",
            examType: "Quiz",
            examName: "Programming Quiz 1",
            marksObtained: 22,
            maxMarks: 25,
            grade: "A",
            semester: "Fall 2024",
            academicYear: "2024-25"
         },
         {
            studentId: students[2]._id,
            courseCode: "ENG101",
            examType: "Assignment",
            examName: "Essay Writing",
            marksObtained: 55,
            maxMarks: 60,
            grade: "B+",
            semester: "Fall 2024",
            academicYear: "2024-25"
         },
         {
            studentId: students[1]._id,
            courseCode: "PHYS101",
            examType: "Project",
            examName: "Physics Lab Report",
            marksObtained: 38,
            maxMarks: 40,
            grade: "A",
            semester: "Fall 2024",
            academicYear: "2024-25"
         }
      ];

      const createdResults = await Result.create(results);
      console.log(`${createdResults.length} results created`);
      return createdResults;
   } catch (error) {
      console.error('Error seeding results:', error);
      process.exit(1);
   }
};

// Main seed function
const seedDatabase = async () => {
   try {
      await clearDatabase();
      const users = await seedUsers();
      const departments = await seedDepartments();
      const courses = await seedCourses(departments);
      const students = await seedStudents(courses);
      const faculty = await seedFaculty(courses, departments);
      const books = await seedBooks(departments);
      const hostels = await seedHostels();
      const transactions = await seedLibraryTransactions(students, books);
      const timetables = await seedTimetables(courses);
      const exams = await seedExams(courses);
      const assignments = await seedAssignments(courses, faculty);
      const results = await seedResults(students, courses);

      console.log("Database seeded successfully");
      process.exit(0);
   } catch (error) {
      console.error("Error seeding database:", error);
      process.exit(1);
   }
};

// Run the seed function
seedDatabase();
