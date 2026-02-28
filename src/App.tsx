import { Routes, Route, Navigate } from 'react-router-dom'
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'
import HomePage from './HomePage'

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App
