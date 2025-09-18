import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import { isAuthenticated } from '../utils/auth'

export default function AppRouter() {
  const authed = isAuthenticated()

  return (
    <Routes>
      <Route path="/" element={<Navigate to={authed ? '/home' : '/auth/login'} replace />} />
      <Route path="/auth/login" element={authed ? <Navigate to="/home" replace /> : <Login />} />
      <Route path="/home" element={authed ? <Home /> : <Navigate to="/auth/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
