import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '../utils/auth'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export type LoginErrors = {
  username?: string
  email?: string
  password?: string
  api?: string
}

export default function useLogin() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword(v => !v)

  const validate = () => {
    const next: LoginErrors = {}
    if (username && username !== 'emilys') {
      next.username = 'Only username "emilys" is allowed.'
    }
    if (email && !isValidEmail(email)) {
      next.email = 'Please enter a valid email address (e.g., example@gmail.com).'
    }
    if (password.length < 8) {
      next.password = 'Password must be at least 8 characters.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async () => {
    setErrors({})
    if (!validate()) return
    try {
      setLoading(true)
      await loginApi({
        username: username === 'emilys' ? username : undefined,
        email: username === 'emilys' ? undefined : email,
        password,
      })
      navigate('/home', { replace: true })
    } catch (err) {
      setErrors(prev => ({ ...prev, api: 'Invalid credentials. Please try again.' }))
    } finally {
      setLoading(false)
    }
  }

  return {
    // state
    username,
    email,
    password,
    remember,
    loading,
    errors,
    showPassword,
    // setters
    setUsername,
    setEmail,
    setPassword,
    setRemember,
    toggleShowPassword,
    // actions
    submit,
  }
}
