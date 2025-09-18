import { useEffect } from 'react'
import { getStoredUser, logout } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import HomeContent from '../components/HomeContent/HomeContent'

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
    <div className="h-[100dvh] w-full bg-white flex items-center justify-center p-[24px] md:p-[75px_74px] lg:overflow-hidden">
      <HomeContent className="w-fit max-h-[538px]" user={user} onLogout={onLogout} />
    </div>
  )
}
