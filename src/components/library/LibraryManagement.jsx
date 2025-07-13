import React, { useState } from 'react';

const LibraryManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('bookInventory');
  
  // State for book inventory
  const [books, setBooks] = useState([
    { id: 1, title: 'Data Structures and Algorithms', author: 'Thomas H. Cormen', isbn: '9780262033848', category: 'Computer Science', publisher: 'MIT Press', copies: 5, availableCopies: 3, location: 'Shelf A-12' },
    { id: 2, title: 'Introduction to Electrodynamics', author: 'David J. Griffiths', isbn: '9780321856562', category: 'Physics', publisher: 'Pearson', copies: 3, availableCopies: 1, location: 'Shelf B-05' },
    { id: 3, title: 'Principles of Economics', author: 'N. Gregory Mankiw', isbn: '9781305585126', category: 'Economics', publisher: 'Cengage Learning', copies: 4, availableCopies: 4, location: 'Shelf C-08' },
  ]);
  
  // State for issued books
  const [issuedBooks, setIssuedBooks] = useState([
    { id: 1, bookId: 1, bookTitle: 'Data Structures and Algorithms', studentId: 'STU001', studentName: 'John Doe', issueDate: '2023-08-01', dueDate: '2023-08-15', returnDate: '', status: 'Issued' },
    { id: 2, bookId: 2, bookTitle: 'Introduction to Electrodynamics', studentId: 'STU002', studentName: 'Jane Smith', issueDate: '2023-07-25', dueDate: '2023-08-08', returnDate: '', status: 'Issued' },
    { id: 3, bookId: 1, bookTitle: 'Data Structures and Algorithms', studentId: 'STU003', studentName: 'Robert Johnson', issueDate: '2023-07-15', dueDate: '2023-07-29', returnDate: '2023-07-28', status: 'Returned' },
  ]);
  
  // State for penalties
  const [penalties, setPenalties] = useState([
    { id: 1, studentId: 'STU004', studentName: 'Emily Brown', bookTitle: 'Machine Learning: A Probabilistic Perspective', issueDate: '2023-06-15', dueDate: '2023-06-29', returnDate: '2023-07-10', daysLate: 11, amount: 110, status: 'Unpaid' },
    { id: 2, studentId: 'STU005', studentName: 'Michael Wilson', bookTitle: 'Organic Chemistry', issueDate: '2023-07-01', dueDate: '2023-07-15', returnDate: '2023-07-20', daysLate: 5, amount: 50, status: 'Paid' },
  ]);
  
  // State for digital resources
  const [digitalResources, setDigitalResources] = useState([
    { id: 1, title: 'IEEE Xplore Digital Library', type: 'Journal Database', url: 'https://ieeexplore.ieee.org', description: 'Access to IEEE journals, conference proceedings, and standards', accessType: 'Subscription' },
    { id: 2, title: 'ACM Digital Library', type: 'Journal Database', url: 'https://dl.acm.org', description: 'Publications from the Association for Computing Machinery', accessType: 'Subscription' },
    { id: 3, title: 'Introduction to Machine Learning', type: 'E-Book', url: 'https://library.institution.edu/ebooks/ml-intro', description: 'Comprehensive introduction to machine learning concepts', accessType: 'Open Access' },
  ]);
  
  // State for new book form
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publisher: '',
    copies: '',
    location: '',
  });
  
  // State for new issue form
  const [newIssue, setNewIssue] = useState({
    bookId: '',
    bookTitle: '',
    studentId: '',
    studentName: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
  
  // State for new digital resource form
  const [newDigitalResource, setNewDigitalResource] = useState({
    title: '',
    type: '',
    url: '',
    description: '',
    accessType: 'Subscription',
  });
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle book form change
  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };
  
  // Handle issue form change
  const handleIssueChange = (e) => {
    const { name, value } = e.target;
    setNewIssue({
      ...newIssue,
      [name]: value,
    });
    
    // If book ID is selected, auto-fill book title
    if (name === 'bookId') {
      const selectedBook = books.find(book => book.id === parseInt(value));
      if (selectedBook) {
        setNewIssue({
          ...newIssue,
          bookId: value,
          bookTitle: selectedBook.title,
        });
      }
    }
  };
  
  // Handle digital resource form change
  const handleDigitalResourceChange = (e) => {
    const { name, value } = e.target;
    setNewDigitalResource({
      ...newDigitalResource,
      [name]: value,
    });
  };
  
  // Add new book
  const handleAddBook = (e) => {
    e.preventDefault();
    const newBookEntry = {
      id: books.length + 1,
      ...newBook,
      copies: parseInt(newBook.copies),
      availableCopies: parseInt(newBook.copies),
    };
    setBooks([...books, newBookEntry]);
    setNewBook({
      title: '',
      author: '',
      isbn: '',
      category: '',
      publisher: '',
      copies: '',
      location: '',
    });
  };
  
  // Issue a book
  const handleIssueBook = (e) => {
    e.preventDefault();
    
    // Update available copies
    const updatedBooks = books.map(book => {
      if (book.id === parseInt(newIssue.bookId)) {
        return {
          ...book,
          availableCopies: book.availableCopies - 1,
        };
      }
      return book;
    });
    
    // Add new issue record
    const newIssueRecord = {
      id: issuedBooks.length + 1,
      ...newIssue,
      bookId: parseInt(newIssue.bookId),
      returnDate: '',
      status: 'Issued',
    };
    
    setBooks(updatedBooks);
    setIssuedBooks([...issuedBooks, newIssueRecord]);
    setNewIssue({
      bookId: '',
      bookTitle: '',
      studentId: '',
      studentName: '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  };
  
  // Return a book
  const handleReturnBook = (id) => {
    // Find the issue record
    const issueRecord = issuedBooks.find(issue => issue.id === id);
    
    // Update available copies
    const updatedBooks = books.map(book => {
      if (book.id === issueRecord.bookId) {
        return {
          ...book,
          availableCopies: book.availableCopies + 1,
        };
      }
      return book;
    });
    
    // Update issue record
    const updatedIssues = issuedBooks.map(issue => {
      if (issue.id === id) {
        const returnDate = new Date().toISOString().split('T')[0];
        const dueDate = new Date(issue.dueDate);
        const returnDateObj = new Date(returnDate);
        const daysLate = returnDateObj > dueDate ? Math.ceil((returnDateObj - dueDate) / (1000 * 60 * 60 * 24)) : 0;
        
        // If book is returned late, create a penalty record
        if (daysLate > 0) {
          const penaltyAmount = daysLate * 10; // ₹10 per day
          const newPenalty = {
            id: penalties.length + 1,
            studentId: issue.studentId,
            studentName: issue.studentName,
            bookTitle: issue.bookTitle,
            issueDate: issue.issueDate,
            dueDate: issue.dueDate,
            returnDate: returnDate,
            daysLate: daysLate,
            amount: penaltyAmount,
            status: 'Unpaid',
          };
          setPenalties([...penalties, newPenalty]);
        }
        
        return {
          ...issue,
          returnDate: returnDate,
          status: 'Returned',
        };
      }
      return issue;
    });
    
    setBooks(updatedBooks);
    setIssuedBooks(updatedIssues);
  };
  
  // Add new digital resource
  const handleAddDigitalResource = (e) => {
    e.preventDefault();
    const newResource = {
      id: digitalResources.length + 1,
      ...newDigitalResource,
    };
    setDigitalResources([...digitalResources, newResource]);
    setNewDigitalResource({
      title: '',
      type: '',
      url: '',
      description: '',
      accessType: 'Subscription',
    });
  };
  
  // Update penalty status
  const handleUpdatePenaltyStatus = (id, status) => {
    const updatedPenalties = penalties.map(penalty => 
      penalty.id === id ? { ...penalty, status } : penalty
    );
    setPenalties(updatedPenalties);
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Library Management</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'bookInventory' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('bookInventory')}
        >
          Book Inventory
        </button>
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'issueReturn' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('issueReturn')}
        >
          Issue/Return
        </button>
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'penalties' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('penalties')}
        >
          Penalties
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'digitalLibrary' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('digitalLibrary')}
        >
          Digital Library
        </button>
      </div>
      
      {/* Book Inventory Tab */}
      {activeTab === 'bookInventory' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Book Inventory</h2>
          </div>
          
          {/* Add Book Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Add New Book</h3>
            <form onSubmit={handleAddBook}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newBook.title}
                    onChange={handleBookChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Book Title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={newBook.author}
                    onChange={handleBookChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Author Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isbn">
                    ISBN
                  </label>
                  <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={newBook.isbn}
                    onChange={handleBookChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter ISBN"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={newBook.category}
                    onChange={handleBookChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Category"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publisher">
                    Publisher
                  </label>
                  <input
                    type="text"
                    id="publisher"
                    name="publisher"
                    value={newBook.publisher}
                    onChange={handleBookChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Publisher"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="copies">
                    Number of Copies
                  </label>
                  <input
                    type="number"
                    id="copies"
                    name="copies"
                    value={newBook.copies}
                    onChange={handleBookChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Number of Copies"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                    Shelf Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={newBook.location}
                    onChange={handleBookChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Shelf Location (e.g., A-12)"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
          
          {/* Book Inventory Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Book Inventory</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Author</th>
                  <th className="py-3 px-6 text-left">ISBN</th>
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-left">Publisher</th>
                  <th className="py-3 px-6 text-left">Total Copies</th>
                  <th className="py-3 px-6 text-left">Available</th>
                  <th className="py-3 px-6 text-left">Location</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {books.map((book) => (
                  <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{book.title}</td>
                    <td className="py-3 px-6 text-left">{book.author}</td>
                    <td className="py-3 px-6 text-left">{book.isbn}</td>
                    <td className="py-3 px-6 text-left">{book.category}</td>
                    <td className="py-3 px-6 text-left">{book.publisher}</td>
                    <td className="py-3 px-6 text-left">{book.copies}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`px-2 py-1 rounded-full text-xs ${book.availableCopies > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {book.availableCopies}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{book.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Issue/Return Tab */}
      {activeTab === 'issueReturn' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Issue & Return Books</h2>
          </div>
          
          {/* Issue Book Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Issue Book</h3>
            <form onSubmit={handleIssueBook}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bookId">
                    Book
                  </label>
                  <select
                    id="bookId"
                    name="bookId"
                    value={newIssue.bookId}
                    onChange={handleIssueChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Book</option>
                    {books.filter(book => book.availableCopies > 0).map(book => (
                      <option key={book.id} value={book.id}>{book.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={newIssue.studentId}
                    onChange={handleIssueChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Student ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentName">
                    Student Name
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={newIssue.studentName}
                    onChange={handleIssueChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Student Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issueDate">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    id="issueDate"
                    name="issueDate"
                    value={newIssue.issueDate}
                    onChange={handleIssueChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={newIssue.dueDate}
                    onChange={handleIssueChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={!newIssue.bookId}
                >
                  Issue Book
                </button>
              </div>
            </form>
          </div>
          
          {/* Issued Books Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Issued Books</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Book Title</th>
                  <th className="py-3 px-6 text-left">Student ID</th>
                  <th className="py-3 px-6 text-left">Student Name</th>
                  <th className="py-3 px-6 text-left">Issue Date</th>
                  <th className="py-3 px-6 text-left">Due Date</th>
                  <th className="py-3 px-6 text-left">Return Date</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {issuedBooks.map((issue) => (
                  <tr key={issue.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{issue.bookTitle}</td>
                    <td className="py-3 px-6 text-left">{issue.studentId}</td>
                    <td className="py-3 px-6 text-left">{issue.studentName}</td>
                    <td className="py-3 px-6 text-left">{issue.issueDate}</td>
                    <td className="py-3 px-6 text-left">{issue.dueDate}</td>
                    <td className="py-3 px-6 text-left">{issue.returnDate || 'Not returned'}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`px-2 py-1 rounded-full text-xs ${issue.status === 'Returned' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {issue.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {issue.status === 'Issued' && (
                        <button
                          onClick={() => handleReturnBook(issue.id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
                        >
                          Return
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Penalties Tab */}
      {activeTab === 'penalties' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Penalty Management</h2>
          </div>
          
          {/* Penalties Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Penalty Records</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Student ID</th>
                  <th className="py-3 px-6 text-left">Student Name</th>
                  <th className="py-3 px-6 text-left">Book Title</th>
                  <th className="py-3 px-6 text-left">Due Date</th>
                  <th className="py-3 px-6 text-left">Return Date</th>
                  <th className="py-3 px-6 text-left">Days Late</th>
                  <th className="py-3 px-6 text-left">Amount (₹)</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {penalties.map((penalty) => (
                  <tr key={penalty.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{penalty.studentId}</td>
                    <td className="py-3 px-6 text-left">{penalty.studentName}</td>
                    <td className="py-3 px-6 text-left">{penalty.bookTitle}</td>
                    <td className="py-3 px-6 text-left">{penalty.dueDate}</td>
                    <td className="py-3 px-6 text-left">{penalty.returnDate}</td>
                    <td className="py-3 px-6 text-left">{penalty.daysLate}</td>
                    <td className="py-3 px-6 text-left">₹{penalty.amount}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`px-2 py-1 rounded-full text-xs ${penalty.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {penalty.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {penalty.status === 'Unpaid' && (
                        <button
                          onClick={() => handleUpdatePenaltyStatus(penalty.id, 'Paid')}
                          className="bg-green-500 hover:bg-green-700 text-white text-xs py-1 px-2 rounded"
                        >
                          Mark as Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Digital Library Tab */}
      {activeTab === 'digitalLibrary' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Digital Library</h2>
          </div>
          
          {/* Add Digital Resource Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Add Digital Resource</h3>
            <form onSubmit={handleAddDigitalResource}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resourceTitle">
                    Title
                  </label>
                  <input
                    type="text"
                    id="resourceTitle"
                    name="title"
                    value={newDigitalResource.title}
                    onChange={handleDigitalResourceChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Resource Title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resourceType">
                    Type
                  </label>
                  <select
                    id="resourceType"
                    name="type"
                    value={newDigitalResource.type}
                    onChange={handleDigitalResourceChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="E-Book">E-Book</option>
                    <option value="Journal Database">Journal Database</option>
                    <option value="Video Lecture">Video Lecture</option>
                    <option value="Research Paper">Research Paper</option>
                    <option value="Educational Website">Educational Website</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resourceUrl">
                    URL
                  </label>
                  <input
                    type="url"
                    id="resourceUrl"
                    name="url"
                    value={newDigitalResource.url}
                    onChange={handleDigitalResourceChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Resource URL"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accessType">
                    Access Type
                  </label>
                  <select
                    id="accessType"
                    name="accessType"
                    value={newDigitalResource.accessType}
                    onChange={handleDigitalResourceChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="Subscription">Subscription</option>
                    <option value="Open Access">Open Access</option>
                    <option value="Campus Only">Campus Only</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resourceDescription">
                    Description
                  </label>
                  <textarea
                    id="resourceDescription"
                    name="description"
                    value={newDigitalResource.description}
                    onChange={handleDigitalResourceChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Resource Description"
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Resource
                </button>
              </div>
            </form>
          </div>
          
          {/* Digital Resources Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Digital Resources</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Type</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-left">Access Type</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {digitalResources.map((resource) => (
                  <tr key={resource.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{resource.title}</td>
                    <td className="py-3 px-6 text-left">{resource.type}</td>
                    <td className="py-3 px-6 text-left">{resource.description}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`px-2 py-1 rounded-full text-xs ${resource.accessType === 'Open Access' ? 'bg-green-100 text-green-800' : resource.accessType === 'Campus Only' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                        {resource.accessType}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
                      >
                        Access
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryManagement;