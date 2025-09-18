import { useEffect } from 'react'
import { getStoredUser, logout } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const user = getStoredUser()

  useEffect(() => {
    if (!user) {
      navigate('/auth/login', { replace: true })
    }
  }, [user, navigate])

  const onLogout = () => {
    logout()
    navigate('/auth/login', { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-8 text-center">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="mt-2 text-gray-600">You are logged in{user ? ` as ${user.username}` : ''}.</p>

        <button
          onClick={onLogout}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
