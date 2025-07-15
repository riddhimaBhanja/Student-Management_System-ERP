import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axios';

const LibraryManagement = () => {
  const { currentUser, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState('search');
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myBooks, setMyBooks] = useState([]);
  const [myFines, setMyFines] = useState({ transactions: [], totalFine: 0 });

  // Fetch all books on component load
  useEffect(() => {
    fetchAllBooks();
  }, []);

  // Fetch user's borrowed books
  useEffect(() => {
    if (userRole === 'student' || userRole === 'faculty') {
      fetchMyBooks();
      fetchMyFines();
    }
  }, [userRole]);

  const fetchAllBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/library/books');
      setBooks(response.data.data.books);
    } catch (error) {
      setError('Failed to fetch books');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyBooks = async () => {
    try {
      const response = await api.get('/library/my-books');
      setMyBooks(response.data.data);
    } catch (error) {
      setError('Failed to fetch borrowed books');
    }
  };

  const fetchMyFines = async () => {
    try {
      const response = await api.get('/library/my-fines');
      setMyFines(response.data.data);
    } catch (error) {
      setError('Failed to fetch fines');
    }
  };

  const searchBooks = async () => {
    if (!searchQuery.trim()) {
      // If search query is empty, fetch all books
      await fetchAllBooks();
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/library/books/search', {
        params: { query: searchQuery }
      });
      setBooks(response.data.data.books || response.data.data || []);
    } catch (error) {
      setError('Failed to search books');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIssueBook = async (bookId, copyBarcode) => {
    try {
      await api.post('/library/issue', {
        userId: currentUser._id,
        userType: userRole,
        bookId,
        copyBarcode
      });
      fetchMyBooks();
    } catch (error) {
      setError('Failed to issue book');
    }
  };

  const handleReturnBook = async (transactionId) => {
    try {
      await api.post(`/library/return/${transactionId}`);
      fetchMyBooks();
      fetchMyFines();
    } catch (error) {
      setError('Failed to return book');
    }
  };

  const handleRenewBook = async (transactionId) => {
    try {
      await api.post(`/library/renew/${transactionId}`);
      fetchMyBooks();
    } catch (error) {
      setError('Failed to renew book');
    }
  };

  const handlePayFine = async (transactionId, amount) => {
    try {
      await api.post(`/library/fines/${transactionId}/pay`, {
        amount,
        paymentMode: 'Online'
      });
      fetchMyFines();
    } catch (error) {
      setError('Failed to process payment');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Library Management</h1>
        
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'search' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
            onClick={() => setActiveTab('search')}
          >
            Search Books
          </button>
          {(userRole === 'student' || userRole === 'faculty') && (
            <>
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === 'borrowed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
                onClick={() => setActiveTab('borrowed')}
              >
                My Books
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === 'fines' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
                onClick={() => setActiveTab('fines')}
              >
                My Fines
              </button>
            </>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Search Section */}
        {activeTab === 'search' && (
          <div>
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className="flex-1 p-2 border rounded text-black"
              />
              <button
                onClick={searchBooks}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
              <button
                onClick={fetchAllBooks}
                disabled={isLoading}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
              >
                View All Books
              </button>
            </div>

            {/* Books List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div key={book._id} className="border rounded-lg p-4 shadow bg-white">
                  <h3 className="text-lg font-semibold text-black">{book.title}</h3>
                  <p className="text-gray-600">{book.authors.join(', ')}</p>
                  <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
                  <p className="text-sm text-gray-500">Category: {book.category}</p>
                  <p className="text-sm text-gray-500">Publisher: {book.publisher}</p>
                  <p className="text-sm text-gray-500">Edition: {book.edition}</p>
                  <p className="mt-2 text-black font-medium">
                    Available Copies: {book.copies.filter(c => c.status === 'Available').length}
                  </p>
                  <p className="text-sm text-gray-600">
                    Location: {book.location.shelf}, Row {book.location.row}, Section {book.location.section}
                  </p>
                  {(userRole === 'student' || userRole === 'faculty') && (
                    <button
                      onClick={() => handleIssueBook(book._id, book.copies[0]?.barcode)}
                      disabled={!book.copies.some(c => c.status === 'Available')}
                      className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
                    >
                      Issue Book
                    </button>
                  )}
                </div>
              ))}
              {books.length === 0 && !isLoading && (
                <div className="col-span-full text-center text-gray-500 py-8">
                  <p className="text-black">No books found. Click "View All Books" to see the library collection.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Borrowed Books Section */}
        {activeTab === 'borrowed' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">My Borrowed Books</h2>
            <div className="grid grid-cols-1 gap-4">
              {myBooks.map((transaction) => (
                <div key={transaction._id} className="border rounded-lg p-4 shadow">
                  <h3 className="text-lg font-semibold">{transaction.book.title}</h3>
                  <p className="text-gray-600">Due Date: {new Date(transaction.dates.dueDate).toLocaleDateString()}</p>
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => handleReturnBook(transaction.transactionId)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Return
                    </button>
                    <button
                      onClick={() => handleRenewBook(transaction.transactionId)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Renew
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fines Section */}
        {activeTab === 'fines' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              My Fines (Total: ₹{myFines.totalFine})
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {myFines.transactions.map((transaction) => (
                <div key={transaction._id} className="border rounded-lg p-4 shadow">
                  <h3 className="text-lg font-semibold">{transaction.book.title}</h3>
                  <p className="text-gray-600">Fine Amount: ₹{transaction.fine.amount}</p>
                  <button
                    onClick={() => handlePayFine(transaction.transactionId, transaction.fine.amount)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Pay Fine
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryManagement;