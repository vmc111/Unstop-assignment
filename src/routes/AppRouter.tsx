import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import { isAuthenticated } from '../utils/auth'
import { useState, useEffect } from 'react'

export default function AppRouter() {
  const [authedState, setAuthedState] = useState(isAuthenticated())

  useEffect(() => {
    setAuthedState(isAuthenticated())
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navigate to={authedState ? '/home' : '/auth/login'} replace />} />
      <Route
        path="/auth/login"
        element={authedState ? <Navigate to="/home" replace /> : <Login />}
      />
      <Route
        path="/home"
        element={authedState ? <Home /> : <Navigate to="/auth/login" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
