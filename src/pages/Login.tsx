import { useState, type FormEvent } from 'react'
import { FaUser, FaEnvelope, FaLock, FaFacebookF, FaGoogle } from 'react-icons/fa'
import { loginApi } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import { images } from '../constants/ImageConstants'
import LoginForm from '../components/LoginForm/LoginForn'

function isValidEmail(email: string) {
  // Simple RFC5322-inspired email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{
    username?: string
    email?: string
    password?: string
    api?: string
  }>({})

  const validate = () => {
    const next: typeof errors = {}
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrors({})
    if (!validate()) return

    try {
      setLoading(true)
      // Prefer username if provided (and equals emilys), otherwise use email
      await loginApi({
        username: username === 'emilys' ? username : undefined,
        email: username === 'emilys' ? undefined : email,
        password,
      })

      // If remember is not checked, we could store in sessionStorage; for now we always use localStorage
      // Navigate to home on success
      navigate('/home', { replace: true })
    } catch (err: any) {
      setErrors(prev => ({ ...prev, api: 'Invalid credentials. Please try again.' }))
    } finally {
      setLoading(false)
    }
  }

  const renderBannerImage = (): React.ReactElement => (
    <div className="max-w-[540px] max-h-[540px] overflow-hidden flex-1 md:block hidden">
      <img src={images.illustrationImage} alt="Illustration" />
    </div>
  )

  return (
    <div className="h-[100dvh] w-full bg-[#F4F4F4] flex items-center gap-[32px] justify-between p-[75px_74px]">
      {renderBannerImage()}
      <LoginForm className="flex-1" />
    </div>
  )
}
