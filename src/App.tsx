import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard.tsx'
import './App.css'
import Login from './components/Login.tsx'
import Register from './components/Register.tsx'
import { useAuth } from './hook/useAuth'
import './index.css'

function App() {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    )
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login onAuthChange={() => {}} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register onSignUp={() => {}} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
