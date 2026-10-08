import './App.css'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import SignUpPage from './pages/Auth/SignUpPage'
import { Toaster } from 'react-hot-toast';
import SignInPage from './pages/Auth/SignInPage'

function App() {

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUpPage />} />

        <Route path="/login" element={<SignInPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
