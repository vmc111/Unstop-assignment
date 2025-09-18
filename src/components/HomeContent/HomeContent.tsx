import cn from 'classnames'
import React from 'react'

import type { AuthUser } from '../../utils/auth'

import * as Styles from './styles'
import { images } from '../../constants/ImageConstants'

interface HomeContentProps {
  className?: string
  user: AuthUser | null
  onLogout: () => void
}

const HomeContent = (props: HomeContentProps): React.ReactElement => {
  const { className, user, onLogout } = props

  const renderWelcome = (): React.ReactElement => (
    <div className={Styles.welcomeContainerStyles}>
      <p className={Styles.titleStyles}>Welcome to</p>
      <p className={Styles.subtitleStyles}>Unstop</p>
    </div>
  )

  const renderProfileCard = (): React.ReactElement => (
    <div className={Styles.cardStyles}>
      <div className={Styles.avatarContainerStyles}>
        <img
          src={user?.image || images.profileImage}
          alt={user?.username || 'User'}
          className={Styles.avatarStyles}
        />
      </div>
      <div className="text-center">
        <p className={Styles.nameStyles}>
          {user?.firstName
            ? `${user.firstName} ${user?.lastName ?? ''}`.trim()
            : user?.username || 'User'}
        </p>
        <p className={Styles.emailStyles}>{user?.email || 'example@gmail.com'}</p>
        {user?.gender ? <p className={Styles.genderStyles}>{user.gender || ''}</p> : null}
      </div>
      <button onClick={onLogout} className={Styles.logoutButtonStyles}>
        Logout
      </button>
    </div>
  )

  return (
    <div className={cn(Styles.containerStyles, className)}>
      {renderWelcome()}
      {renderProfileCard()}
    </div>
  )
}

export default HomeContent
