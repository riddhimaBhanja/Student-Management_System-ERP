import React, { useState } from 'react';

const AcademicManagement = () => {
  const [activeTab, setActiveTab] = useState('courses');
  
  // Sample data for courses
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Computer Science',
      department: 'Computer Science & Engineering',
      credits: 4,
      semester: 1,
      faculty: 'John Doe',
      status: 'active'
    },
    {
      id: 2,
      code: 'CS201',
      name: 'Data Structures and Algorithms',
      department: 'Computer Science & Engineering',
      credits: 4,
      semester: 3,
      faculty: 'Jane Smith',
      status: 'active'
    },
    {
      id: 3,
      code: 'EC101',
      name: 'Basic Electronics',
      department: 'Electronics & Communication Engineering',
      credits: 3,
      semester: 1,
      faculty: 'Robert Johnson',
      status: 'active'
    }
  ]);

  // Sample data for timetable
  const [timetable, setTimetable] = useState([
    {
      id: 1,
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:30',
      courseCode: 'CS101',
      courseName: 'Introduction to Computer Science',
      faculty: 'John Doe',
      room: 'A-101',
      batch: 'CSE-2023'
    },
    {
      id: 2,
      day: 'Monday',
      startTime: '10:45',
      endTime: '12:15',
      courseCode: 'CS201',
      courseName: 'Data Structures and Algorithms',
      faculty: 'Jane Smith',
      room: 'A-102',
      batch: 'CSE-2022'
    },
    {
      id: 3,
      day: 'Tuesday',
      startTime: '09:00',
      endTime: '10:30',
      courseCode: 'EC101',
      courseName: 'Basic Electronics',
      faculty: 'Robert Johnson',
      room: 'B-101',
      batch: 'ECE-2023'
    }
  ]);

  // Sample data for exams
  const [exams, setExams] = useState([
    {
      id: 1,
      examName: 'Mid Semester Examination',
      courseCode: 'CS101',
      courseName: 'Introduction to Computer Science',
      date: '2023-09-15',
      startTime: '10:00',
      endTime: '12:00',
      venue: 'Examination Hall 1',
      maxMarks: 30,
      status: 'scheduled'
    },
    {
      id: 2,
      examName: 'End Semester Examination',
      courseCode: 'CS201',
      courseName: 'Data Structures and Algorithms',
      date: '2023-11-20',
      startTime: '14:00',
      endTime: '17:00',
      venue: 'Examination Hall 2',
      maxMarks: 70,
      status: 'scheduled'
    },
    {
      id: 3,
      examName: 'Quiz 1',
      courseCode: 'EC101',
      courseName: 'Basic Electronics',
      date: '2023-08-25',
      startTime: '09:00',
      endTime: '10:00',
      venue: 'B-101',
      maxMarks: 15,
      status: 'completed'
    }
  ]);

  // Sample data for assignments
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Programming Assignment 1',
      courseCode: 'CS101',
      courseName: 'Introduction to Computer Science',
      description: 'Implement a simple calculator using C programming language',
      dueDate: '2023-08-30',
      maxMarks: 10,
      status: 'active'
    },
    {
      id: 2,
      title: 'Data Structures Implementation',
      courseCode: 'CS201',
      courseName: 'Data Structures and Algorithms',
      description: 'Implement Linked List, Stack, and Queue data structures',
      dueDate: '2023-09-15',
      maxMarks: 15,
      status: 'active'
    },
    {
      id: 3,
      title: 'Circuit Design Project',
      courseCode: 'EC101',
      courseName: 'Basic Electronics',
      description: 'Design and simulate a basic amplifier circuit',
      dueDate: '2023-09-10',
      maxMarks: 20,
      status: 'active'
    }
  ]);

  // State for new course form
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    department: '',
    credits: '',
    semester: '',
    faculty: ''
  });

  // State for new timetable entry form
  const [newTimetableEntry, setNewTimetableEntry] = useState({
    day: 'Monday',
    startTime: '',
    endTime: '',
    courseCode: '',
    courseName: '',
    faculty: '',
    room: '',
    batch: ''
  });

  // State for new exam form
  const [newExam, setNewExam] = useState({
    examName: '',
    courseCode: '',
    courseName: '',
    date: '',
    startTime: '',
    endTime: '',
    venue: '',
    maxMarks: ''
  });

  // State for new assignment form
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    courseCode: '',
    courseName: '',
    description: '',
    dueDate: '',
    maxMarks: ''
  });

  // Handle course form input changes
  const handleCourseInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: value
    });
  };

  // Handle timetable form input changes
  const handleTimetableInputChange = (e) => {
    const { name, value } = e.target;
    setNewTimetableEntry({
      ...newTimetableEntry,
      [name]: value
    });

    // Auto-fill course name and faculty when course code is selected
    if (name === 'courseCode') {
      const selectedCourse = courses.find(course => course.code === value);
      if (selectedCourse) {
        setNewTimetableEntry(prev => ({
          ...prev,
          courseName: selectedCourse.name,
          faculty: selectedCourse.faculty
        }));
      }
    }
  };

  // Handle exam form input changes
  const handleExamInputChange = (e) => {
    const { name, value } = e.target;
    setNewExam({
      ...newExam,
      [name]: value
    });

    // Auto-fill course name when course code is selected
    if (name === 'courseCode') {
      const selectedCourse = courses.find(course => course.code === value);
      if (selectedCourse) {
        setNewExam(prev => ({
          ...prev,
          courseName: selectedCourse.name
        }));
      }
    }
  };

  // Handle assignment form input changes
  const handleAssignmentInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({
      ...newAssignment,
      [name]: value
    });

    // Auto-fill course name when course code is selected
    if (name === 'courseCode') {
      const selectedCourse = courses.find(course => course.code === value);
      if (selectedCourse) {
        setNewAssignment(prev => ({
          ...prev,
          courseName: selectedCourse.name
        }));
      }
    }
  };

  // Add new course
  const handleAddCourse = (e) => {
    e.preventDefault();
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    
    const course = {
      id: newId,
      ...newCourse,
      status: 'active'
    };
    
    setCourses([...courses, course]);
    setNewCourse({
      code: '',
      name: '',
      department: '',
      credits: '',
      semester: '',
      faculty: ''
    });
    document.getElementById('addCourseModal').classList.add('hidden');
  };

  // Add new timetable entry
  const handleAddTimetableEntry = (e) => {
    e.preventDefault();
    const newId = timetable.length > 0 ? Math.max(...timetable.map(t => t.id)) + 1 : 1;
    
    const entry = {
      id: newId,
      ...newTimetableEntry
    };
    
    setTimetable([...timetable, entry]);
    setNewTimetableEntry({
      day: 'Monday',
      startTime: '',
      endTime: '',
      courseCode: '',
      courseName: '',
      faculty: '',
      room: '',
      batch: ''
    });
    document.getElementById('addTimetableModal').classList.add('hidden');
  };

  // Add new exam
  const handleAddExam = (e) => {
    e.preventDefault();
    const newId = exams.length > 0 ? Math.max(...exams.map(e => e.id)) + 1 : 1;
    
    const exam = {
      id: newId,
      ...newExam,
      status: 'scheduled'
    };
    
    setExams([...exams, exam]);
    setNewExam({
      examName: '',
      courseCode: '',
      courseName: '',
      date: '',
      startTime: '',
      endTime: '',
      venue: '',
      maxMarks: ''
    });
    document.getElementById('addExamModal').classList.add('hidden');
  };

  // Add new assignment
  const handleAddAssignment = (e) => {
    e.preventDefault();
    const newId = assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1;
    
    const assignment = {
      id: newId,
      ...newAssignment,
      status: 'active'
    };
    
    setAssignments([...assignments, assignment]);
    setNewAssignment({
      title: '',
      courseCode: '',
      courseName: '',
      description: '',
      dueDate: '',
      maxMarks: ''
    });
    document.getElementById('addAssignmentModal').classList.add('hidden');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Academic & Examination Management</h1>
      
      {/* Tabs */}
      <div className="flex border-b mb-6 overflow-x-auto">
        <button 
          className={`py-2 px-4 whitespace-nowrap ${activeTab === 'courses' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('courses')}
        >
          Course Management
        </button>
        <button 
          className={`py-2 px-4 whitespace-nowrap ${activeTab === 'timetable' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('timetable')}
        >
          Class Scheduling
        </button>
        <button 
          className={`py-2 px-4 whitespace-nowrap ${activeTab === 'exams' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('exams')}
        >
          Examination
        </button>
        <button 
          className={`py-2 px-4 whitespace-nowrap ${activeTab === 'assignments' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('assignments')}
        >
          Assignments
        </button>
        <button 
          className={`py-2 px-4 whitespace-nowrap ${activeTab === 'results' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('results')}
        >
          Results & Transcripts
        </button>
      </div>
      
      {/* Course Management Tab */}
      {activeTab === 'courses' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Course List</h2>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById('addCourseModal').classList.remove('hidden')}
            >
              Add New Course
            </button>
          </div>
          
          {/* Courses Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course Code
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Semester
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Faculty
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{course.code}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{course.name}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{course.department}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{course.credits}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{course.semester}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{course.faculty}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className={`relative inline-block px-3 py-1 font-semibold rounded-full ${course.status === 'active' ? 'text-green-900 bg-green-200' : 'text-red-900 bg-red-200'}`}>
                        <span className="relative capitalize">{course.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Add Course Modal */}
          <div id="addCourseModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Course</h3>
                <button 
                  onClick={() => document.getElementById('addCourseModal').classList.add('hidden')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleAddCourse}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                      Course Code
                    </label>
                    <input
                      type="text"
                      id="code"
                      name="code"
                      value={newCourse.code}
                      onChange={handleCourseInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="credits">
                      Credits
                    </label>
                    <input
                      type="number"
                      id="credits"
                      name="credits"
                      value={newCourse.credits}
                      onChange={handleCourseInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                      min="1"
                      max="6"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newCourse.name}
                    onChange={handleCourseInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={newCourse.department}
                    onChange={handleCourseInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Business Administration">Business Administration</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="semester">
                      Semester
                    </label>
                    <select
                      id="semester"
                      name="semester"
                      value={newCourse.semester}
                      onChange={handleCourseInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option value="">Select Semester</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="faculty">
                      Faculty
                    </label>
                    <input
                      type="text"
                      id="faculty"
                      name="faculty"
                      value={newCourse.faculty}
                      onChange={handleCourseInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => document.getElementById('addCourseModal').classList.add('hidden')}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Results & Transcripts Tab */}
      {activeTab === 'results' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Results & Transcripts</h2>
          </div>
          
          {/* Results Filter */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Generate Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resultBatch">
                  Batch
                </label>
                <select
                  id="resultBatch"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Batch</option>
                  <option value="CSE-2023">CSE-2023</option>
                  <option value="CSE-2022">CSE-2022</option>
                  <option value="ECE-2023">ECE-2023</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resultSemester">
                  Semester
                </label>
                <select
                  id="resultSemester"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Semester</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resultExamType">
                  Exam Type
                </label>
                <select
                  id="resultExamType"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Exam Type</option>
                  <option value="Mid Semester">Mid Semester</option>
                  <option value="End Semester">End Semester</option>
                  <option value="Supplementary">Supplementary</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Generate Results
              </button>
            </div>
          </div>
          
          {/* Transcript Generation */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Generate Transcript</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transcriptStudentId">
                  Student ID
                </label>
                <input
                  type="text"
                  id="transcriptStudentId"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Student ID"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transcriptSemester">
                  Semester
                </label>
                <select
                  id="transcriptSemester"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="all">All Semesters (Complete Transcript)</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Generate Transcript
              </button>
            </div>
          </div>
          
          {/* Grade Computation */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Grade Computation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gradeBatch">
                  Batch
                </label>
                <select
                  id="gradeBatch"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Batch</option>
                  <option value="CSE-2023">CSE-2023</option>
                  <option value="CSE-2022">CSE-2022</option>
                  <option value="ECE-2023">ECE-2023</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gradeSemester">
                  Semester
                </label>
                <select
                  id="gradeSemester"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Semester</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gradeType">
                  Grade Type
                </label>
                <select
                  id="gradeType"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="GPA">GPA (Semester)</option>
                  <option value="CGPA">CGPA (Cumulative)</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Compute Grades
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicManagement;-2 px-4 rounded"
                  >
                    Add Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Class Scheduling Tab */}
      {activeTab === 'timetable' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Class Schedule</h2>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById('addTimetableModal').classList.remove('hidden')}
            >
              Add New Class
            </button>
          </div>
          
          {/* Timetable Filter */}
          <div className="mb-6 flex flex-wrap gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="filterDay">
                Filter by Day
              </label>
              <select
                id="filterDay"
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">All Days</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="filterBatch">
                Filter by Batch
              </label>
              <select
                id="filterBatch"
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">All Batches</option>
                <option value="CSE-2023">CSE-2023</option>
                <option value="CSE-2022">CSE-2022</option>
                <option value="ECE-2023">ECE-2023</option>
              </select>
            </div>
          </div>
          
          {/* Timetable */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Faculty
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{entry.day}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{entry.startTime} - {entry.endTime}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{entry.courseCode}</p>
                      <p className="text-gray-600 whitespace-no-wrap">{entry.courseName}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{entry.faculty}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{entry.room}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{entry.batch}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Add Timetable Entry Modal */}
          <div id="addTimetableModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Class</h3>
                <button 
                  onClick={() => document.getElementById('addTimetableModal').classList.add('hidden')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleAddTimetableEntry}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="day">
                    Day
                  </label>
                  <select
                    id="day"
                    name="day"
                    value={newTimetableEntry.day}
                    onChange={handleTimetableInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
                      Start Time
                    </label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={newTimetableEntry.startTime}
                      onChange={handleTimetableInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
                      End Time
                    </label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={newTimetableEntry.endTime}
                      onChange={handleTimetableInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseCode">
                    Course
                  </label>
                  <select
                    id="courseCode"
                    name="courseCode"
                    value={newTimetableEntry.courseCode}
                    onChange={handleTimetableInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.code}>
                        {course.code} - {course.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="room">
                      Room
                    </label>
                    <input
                      type="text"
                      id="room"
                      name="room"
                      value={newTimetableEntry.room}
                      onChange={handleTimetableInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="batch">
                      Batch
                    </label>
                    <input
                      type="text"
                      id="batch"
                      name="batch"
                      value={newTimetableEntry.batch}
                      onChange={handleTimetableInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => document.getElementById('addTimetableModal').classList.add('hidden')}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Examination Tab */}
      {activeTab === 'exams' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Examination Schedule</h2>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById('addExamModal').classList.remove('hidden')}
            >
              Add New Exam
            </button>
          </div>
          
          {/* Exams Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Exam Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Venue
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Max Marks
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{exam.examName}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{exam.courseCode}</p>
                      <p className="text-gray-600 whitespace-no-wrap">{exam.courseName}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{exam.date}</p>
                      <p className="text-gray-600 whitespace-no-wrap">{exam.startTime} - {exam.endTime}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{exam.venue}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{exam.maxMarks}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span 
                        className={`relative inline-block px-3 py-1 font-semibold rounded-full 
                          ${exam.status === 'completed' ? 'text-green-900 bg-green-200' : 
                            exam.status === 'cancelled' ? 'text-red-900 bg-red-200' : 
                            'text-yellow-900 bg-yellow-200'}`}
                      >
                        <span className="relative capitalize">{exam.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Add Exam Modal */}
          <div id="addExamModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Exam</h3>
                <button 
                  onClick={() => document.getElementById('addExamModal').classList.add('hidden')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleAddExam}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="examName">
                    Exam Name
                  </label>
                  <input
                    type="text"
                    id="examName"
                    name="examName"
                    value={newExam.examName}
                    onChange={handleExamInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseCode">
                    Course
                  </label>
                  <select
                    id="courseCode"
                    name="courseCode"
                    value={newExam.courseCode}
                    onChange={handleExamInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.code}>
                        {course.code} - {course.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newExam.date}
                    onChange={handleExamInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
                      Start Time
                    </label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={newExam.startTime}
                      onChange={handleExamInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
                      End Time
                    </label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={newExam.endTime}
                      onChange={handleExamInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="venue">
                      Venue
                    </label>
                    <input
                      type="text"
                      id="venue"
                      name="venue"
                      value={newExam.venue}
                      onChange={handleExamInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxMarks">
                      Max Marks
                    </label>
                    <input
                      type="number"
                      id="maxMarks"
                      name="maxMarks"
                      value={newExam.maxMarks}
                      onChange={handleExamInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                      min="1"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => document.getElementById('addExamModal').classList.add('hidden')}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Exam
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Assignments</h2>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById('addAssignmentModal').classList.remove('hidden')}
            >
              Add New Assignment
            </button>
          </div>
          
          {/* Assignments Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Max Marks
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{assignment.title}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{assignment.courseCode}</p>
                      <p className="text-gray-600 whitespace-no-wrap">{assignment.courseName}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{assignment.description}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{assignment.dueDate}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{assignment.maxMarks}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className={`relative inline-block px-3 py-1 font-semibold rounded-full ${assignment.status === 'active' ? 'text-green-900 bg-green-200' : 'text-red-900 bg-red-200'}`}>
                        <span className="relative capitalize">{assignment.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Add Assignment Modal */}
          <div id="addAssignmentModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Assignment</h3>
                <button 
                  onClick={() => document.getElementById('addAssignmentModal').classList.add('hidden')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleAddAssignment}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newAssignment.title}
                    onChange={handleAssignmentInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseCode">
                    Course
                  </label>
                  <select
                    id="courseCode"
                    name="courseCode"
                    value={newAssignment.courseCode}
                    onChange={handleAssignmentInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.code}>
                        {course.code} - {course.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newAssignment.description}
                    onChange={handleAssignmentInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="3"
                    required
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={newAssignment.dueDate}
                      onChange={handleAssignmentInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxMarks">
                      Max Marks
                    </label>
                    <input
                      type="number"
                      id="maxMarks"
                      name="maxMarks"
                      value={newAssignment.maxMarks}
                      onChange={handleAssignmentInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                      min="1"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => document.getElementById('addAssignmentModal').classList.add('hidden')}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py