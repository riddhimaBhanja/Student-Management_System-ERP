import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/axios';
import { toast } from 'react-toastify';

const AcademicManagement = () => {
  // State management
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    credits: '',
    department: ''
  });

  const [newTimetableEntry, setNewTimetableEntry] = useState({
    day: 'Monday',
    startTime: '',
    endTime: '',
    courseCode: '',
    room: '',
    batch: ''
  });

  const [newExam, setNewExam] = useState({
    examName: '',
    courseCode: '',
    date: '',
    startTime: '',
    endTime: '',
    venue: '',
    maxMarks: ''
  });

  const [newAssignment, setNewAssignment] = useState({
    title: '',
    courseCode: '',
    description: '',
    dueDate: '',
    maxMarks: '',
    assignedBy: ''
  });

  const [newResult, setNewResult] = useState({
    studentId: '',
    courseCode: '',
    examType: '',
    examName: '',
    marksObtained: '',
    maxMarks: '',
    grade: '',
    semester: '',
    academicYear: ''
  });

  // Effect hooks
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchCourses();
        if (activeTab === 'assignments') await fetchAssignments();
        if (activeTab === 'exams') await fetchExams();
        if (activeTab === 'timetable') await fetchTimetable();
        if (activeTab === 'results') await fetchResults();
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  // API calls
  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get('/academic/courses');
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      if (error.code === 'ERR_NETWORK') {
        toast.error('Unable to connect to the server. Please check your connection.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to fetch courses');
      }
      throw error;
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axiosInstance.get('/academic/assignments');
      setAssignments(response.data || []);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch assignments');
      throw error;
    }
  };

  const fetchExams = async () => {
    try {
      const response = await axiosInstance.get('/academic/exams');
      setExams(response.data || []);
    } catch (error) {
      console.error('Error fetching exams:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch exams');
      throw error;
    }
  };

  const fetchTimetable = async () => {
    try {
      const response = await axiosInstance.get('/academic/schedules');
      setTimetable(response.data || []);
    } catch (error) {
      console.error('Error fetching timetable:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch timetable');
      throw error;
    }
  };

  const fetchResults = async () => {
    try {
      const response = await axiosInstance.get('/academic/results');
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
      toast.error('Failed to fetch results');
    }
  };

  // Form handlers
  const handleCourseInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimetableInputChange = (e) => {
    const { name, value } = e.target;
    setNewTimetableEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExamInputChange = (e) => {
    const { name, value } = e.target;
    setNewExam(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAssignmentInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResultInputChange = (e) => {
    const { name, value } = e.target;
    setNewResult(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit handlers
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/academic/courses', newCourse);
      toast.success('Course added successfully');
      fetchCourses();
      setNewCourse({ code: '', name: '', credits: '', department: '' });
      document.getElementById('addCourseModal').classList.add('hidden');
    } catch (error) {
      toast.error('Failed to add course');
    }
  };

  const handleAddTimetableEntry = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/academic/schedules', newTimetableEntry);
      toast.success('Class scheduled successfully');
      fetchTimetable();
      setNewTimetableEntry({
        day: 'Monday',
        startTime: '',
        endTime: '',
        courseCode: '',
        room: '',
        batch: ''
      });
      document.getElementById('addTimetableModal').classList.add('hidden');
    } catch (error) {
      toast.error('Failed to schedule class');
    }
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/academic/exams', newExam);
      toast.success('Exam scheduled successfully');
      fetchExams();
      setNewExam({
        examName: '',
        courseCode: '',
        date: '',
        startTime: '',
        endTime: '',
        venue: '',
        maxMarks: ''
      });
      document.getElementById('addExamModal').classList.add('hidden');
    } catch (error) {
      toast.error('Failed to schedule exam');
    }
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/academic/assignments', newAssignment);
      toast.success('Assignment added successfully');
      fetchAssignments();
      setNewAssignment({
        title: '',
        courseCode: '',
        description: '',
        dueDate: '',
        maxMarks: '',
        assignedBy: ''
      });
      document.getElementById('addAssignmentModal').classList.add('hidden');
    } catch (error) {
      toast.error('Failed to add assignment');
    }
  };

  const handleAddResult = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/academic/results', newResult);
      toast.success('Result added successfully');
      fetchResults();
      setNewResult({
        studentId: '',
        courseCode: '',
        examType: '',
        examName: '',
        marksObtained: '',
        maxMarks: '',
        grade: '',
        semester: '',
        academicYear: ''
      });
      document.getElementById('addResultModal').classList.add('hidden');
    } catch (error) {
      toast.error('Failed to add result');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axiosInstance.delete(`/academic/courses/${courseId}`);
        toast.success('Course deleted successfully');
        fetchCourses();
      } catch (error) {
        toast.error('Failed to delete course');
      }
    }
  };

  const handleDeleteResult = async (resultId) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      try {
        await axiosInstance.delete(`/academic/results/${resultId}`);
        toast.success('Result deleted successfully');
        fetchResults();
      } catch (error) {
        toast.error('Failed to delete result');
      }
    }
  };

  const handleDeleteTimetable = async (timetableId) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        await axiosInstance.delete(`/academic/schedules/${timetableId}`);
        toast.success('Schedule deleted successfully');
        fetchTimetable();
      } catch (error) {
        toast.error('Failed to delete schedule');
      }
    }
  };

  const handleDeleteExam = async (examId) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await axiosInstance.delete(`/academic/exams/${examId}`);
        toast.success('Exam deleted successfully');
        fetchExams();
      } catch (error) {
        toast.error('Failed to delete exam');
      }
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        await axiosInstance.delete(`/academic/assignments/${assignmentId}`);
        toast.success('Assignment deleted successfully');
        fetchAssignments();
      } catch (error) {
        toast.error('Failed to delete assignment');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Academic & Examination Management</h1>
      
      <div className="flex border-b mb-6 overflow-x-auto">
        {['courses', 'timetable', 'exams', 'assignments', 'results'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 whitespace-nowrap ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'courses' ? 'Course Management' :
             tab === 'timetable' ? 'Class Scheduling' :
             tab === 'exams' ? 'Examination' :
             tab === 'assignments' ? 'Assignments' :
             'Results & Transcripts'}
          </button>
        ))}
      </div>

      {/* Course Management Tab */}
      {activeTab === 'courses' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Course List</h2>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById('addCourseModal').classList.remove('hidden')}
              disabled={loading}
            >
              Add New Course
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course Code</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course Name</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Credits</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-5 py-5 text-center text-gray-500">
                        No courses found
                      </td>
                    </tr>
                  ) : (
                    courses.map((course) => (
                      <tr key={course._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{course.courseCode}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{course.name}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{course.credits}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{course.department?.name || course.department}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button 
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            onClick={() => handleDeleteCourse(course._id)}
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Timetable Tab */}
      {activeTab === 'timetable' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Class Scheduling</h2>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById('addTimetableModal').classList.remove('hidden')}
              disabled={loading}
            >
              Add New Schedule
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Day</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course Code</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Room</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Batch</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {timetable.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-5 py-5 text-center text-gray-500">
                        No schedules found
                      </td>
                    </tr>
                  ) : (
                    timetable.map((schedule) => (
                      <tr key={schedule._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{schedule.day}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{schedule.startTime} - {schedule.endTime}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{schedule.courseCode}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{schedule.room}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{schedule.batch}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button 
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            onClick={() => handleDeleteTimetable(schedule._id)}
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Exams Tab */}
      {activeTab === 'exams' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Examination Management</h2>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById('addExamModal').classList.remove('hidden')}
              disabled={loading}
            >
              Schedule New Exam
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Exam Name</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course Code</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Venue</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Max Marks</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-5 py-5 text-center text-gray-500">
                        No exams scheduled
                      </td>
                    </tr>
                  ) : (
                    exams.map((exam) => (
                      <tr key={exam._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{exam.examName}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{exam.courseCode}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(exam.date).toLocaleDateString()}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{exam.startTime} - {exam.endTime}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{exam.venue}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{exam.maxMarks}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button 
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            onClick={() => handleDeleteExam(exam._id)}
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Assignment Management</h2>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById('addAssignmentModal').classList.remove('hidden')}
              disabled={loading}
            >
              Add New Assignment
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course Code</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Max Marks</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-5 py-5 text-center text-gray-500">
                        No assignments found
                      </td>
                    </tr>
                  ) : (
                    assignments.map((assignment) => (
                      <tr key={assignment._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{assignment.title}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{assignment.courseCode}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{assignment.description.length > 50 ? `${assignment.description.substring(0, 50)}...` : assignment.description}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(assignment.dueDate).toLocaleDateString()}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{assignment.maxMarks}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            assignment.status === 'Active' ? 'bg-green-100 text-green-800' :
                            assignment.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {assignment.status}
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button 
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            onClick={() => handleDeleteAssignment(assignment._id)}
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Results & Transcripts</h2>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById('addResultModal').classList.remove('hidden')}
              disabled={loading}
            >
              Add New Result
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Marks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
                        No results found. Add a new result to get started.
                      </td>
                    </tr>
                  ) : (
                    results.map((result) => (
                      <tr key={result._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {result.studentId ? `${result.studentId.firstName} ${result.studentId.lastName}` : 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{result.courseCode}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{result.examType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{result.examName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            result.grade === 'A+' || result.grade === 'A' ? 'bg-green-100 text-green-800' :
                            result.grade === 'B+' || result.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                            result.grade === 'C+' || result.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            result.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {result.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.marksObtained}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.maxMarks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.semester}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.academicYear}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleDeleteResult(result._id)}
                            className="text-red-600 hover:text-red-900 ml-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Course Modal */}
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">Course Code</label>
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Course Name</label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="credits">Credits</label>
              <input
                type="number"
                id="credits"
                name="credits"
                value={newCourse.credits}
                onChange={handleCourseInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                min="1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={newCourse.department}
                onChange={handleCourseInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
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
                Add Course
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Add Timetable Modal */}
      <div id="addTimetableModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Add New Schedule</h3>
            <button 
              onClick={() => document.getElementById('addTimetableModal').classList.add('hidden')}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleAddTimetableEntry}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="day">Day</label>
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">Start Time</label>
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">End Time</label>
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseCode">Course Code</label>
              <input
                type="text"
                id="courseCode"
                name="courseCode"
                value={newTimetableEntry.courseCode}
                onChange={handleTimetableInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="room">Room</label>
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="batch">Batch</label>
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
                Add Schedule
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Add Exam Modal */}
      <div id="addExamModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Schedule New Exam</h3>
            <button 
              onClick={() => document.getElementById('addExamModal').classList.add('hidden')}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleAddExam}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="examName">Exam Name</label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseCode">Course Code</label>
              <input
                type="text"
                id="courseCode"
                name="courseCode"
                value={newExam.courseCode}
                onChange={handleExamInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date</label>
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">Start Time</label>
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">End Time</label>
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="venue">Venue</label>
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxMarks">Maximum Marks</label>
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
                Schedule Exam
              </button>
            </div>
          </form>
        </div>
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseCode">Course Code</label>
              <input
                type="text"
                id="courseCode"
                name="courseCode"
                value={newAssignment.courseCode}
                onChange={handleAssignmentInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newAssignment.description}
                onChange={handleAssignmentInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                rows="3"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedBy">Assigned By (Faculty ID)</label>
              <input
                type="text"
                id="assignedBy"
                name="assignedBy"
                value={newAssignment.assignedBy}
                onChange={handleAssignmentInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="Enter faculty ObjectId"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">Due Date</label>
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxMarks">Maximum Marks</label>
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Assignment
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Add Result Modal */}
      <div id="addResultModal" className="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <form onSubmit={handleAddResult}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Result</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">Student ID</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={newResult.studentId}
                onChange={handleResultInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="Enter student ObjectId"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseCode">Course Code</label>
              <input
                type="text"
                id="courseCode"
                name="courseCode"
                value={newResult.courseCode}
                onChange={handleResultInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="e.g., CS101"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="examType">Exam Type</label>
              <select
                id="examType"
                name="examType"
                value={newResult.examType}
                onChange={handleResultInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Exam Type</option>
                <option value="Assignment">Assignment</option>
                <option value="Quiz">Quiz</option>
                <option value="Midterm">Midterm</option>
                <option value="Final">Final</option>
                <option value="Project">Project</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="examName">Exam Name</label>
              <input
                type="text"
                id="examName"
                name="examName"
                value={newResult.examName}
                onChange={handleResultInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="e.g., Mid-term Examination"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marksObtained">Marks Obtained</label>
              <input
                type="number"
                id="marksObtained"
                name="marksObtained"
                value={newResult.marksObtained}
                onChange={handleResultInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                min="0"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxMarks">Maximum Marks</label>
              <input
                type="number"
                id="maxMarks"
                name="maxMarks"
                value={newResult.maxMarks}
                onChange={handleResultInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                min="1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grade">Grade</label>
              <select
                id="grade"
                name="grade"
                value={newResult.grade}
                onChange={handleResultInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="semester">Semester</label>
              <input
                type="text"
                id="semester"
                name="semester"
                value={newResult.semester}
                onChange={handleResultInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="e.g., Fall 2024"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="academicYear">Academic Year</label>
              <input
                type="text"
                id="academicYear"
                name="academicYear"
                value={newResult.academicYear}
                onChange={handleResultInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="e.g., 2024-25"
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => document.getElementById('addResultModal').classList.add('hidden')}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Result
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AcademicManagement;