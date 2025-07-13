import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Import components
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import { useAuth, AuthProvider } from './context/AuthContext'

function AppContent() {
  const { isAuthenticated, userRole } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard/*" 
          element={
            isAuthenticated() ? 
              <Dashboard userRole={userRole} /> 
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
