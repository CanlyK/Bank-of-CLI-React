import './App.css'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/Auth/SignUpPage'
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SignUp/>
    </>
  )
}

export default App
