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
    maxMarks: ''
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
      const response = await axiosInstance.get('/api/academic/courses');
      if (response.data && response.data.data) {
        setCourses(response.data.data.courses || []);
      }
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
      const response = await axiosInstance.get('/api/academic/assignments');
      if (response.data && response.data.data) {
        setAssignments(response.data.data.assignments || []);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch assignments');
      throw error;
    }
  };

  const fetchExams = async () => {
    try {
      const response = await axiosInstance.get('/api/academic/exams');
      if (response.data && response.data.data) {
        setExams(response.data.data.exams || []);
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch exams');
      throw error;
    }
  };

  const fetchTimetable = async () => {
    try {
      const response = await axiosInstance.get('/api/academic/timetable');
      if (response.data && response.data.data) {
        setTimetable(response.data.data.timetable || []);
      }
    } catch (error) {
      console.error('Error fetching timetable:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch timetable');
      throw error;
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

  // Submit handlers
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/academic/courses', newCourse);
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
      await axiosInstance.post('/api/academic/timetable', newTimetableEntry);
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
      await axiosInstance.post('/api/academic/exams', newExam);
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
      await axiosInstance.post('/api/academic/assignments', newAssignment);
      toast.success('Assignment added successfully');
      fetchAssignments();
      setNewAssignment({
        title: '',
        courseCode: '',
        description: '',
        dueDate: '',
        maxMarks: ''
      });
      document.getElementById('addAssignmentModal').classList.add('hidden');
    } catch (error) {
      toast.error('Failed to add assignment');
    }
  };

  // Delete handlers
  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axiosInstance.delete(`/api/academic/courses/${courseId}`);
        toast.success('Course deleted successfully');
        fetchCourses();
      } catch (error) {
        toast.error('Failed to delete course');
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
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{course.code}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{course.name}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{course.credits}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{course.department}</td>
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
          {/* ... existing timetable content ... */}
        </div>
      )}

      {/* Exams Tab */}
      {activeTab === 'exams' && (
        <div>
          {/* ... existing exams content ... */}
        </div>
      )}

      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <div>
          {/* ... existing assignments content ... */}
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Results & Transcripts</h2>
          <p className="text-gray-600">Coming soon...</p>
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
    </div>
  );
};

export default AcademicManagement;