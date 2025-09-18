import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import { isAuthenticated } from '../utils/auth'
import { useEffect, useState } from 'react'

const AppRouter = () => {
  // Derive auth on each render so navigation after login/logout is accurate
  const authed = isAuthenticated()
  // Force re-render when auth state changes (localStorage updates or custom event)
  const [, setBump] = useState(0)

  useEffect(() => {
    const onChange = () => setBump(prev => prev + 1)
    window.addEventListener('auth-changed', onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener('auth-changed', onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navigate to={authed ? '/home' : '/auth/login'} replace />} />
      <Route path="/auth/login" element={authed ? <Navigate to="/home" replace /> : <Login />} />
      <Route path="/home" element={authed ? <Home /> : <Navigate to="/auth/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter
