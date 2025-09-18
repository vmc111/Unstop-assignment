import React from 'react'
import cn from 'classnames'

import * as Styles from './styles'
import { images } from '../../constants/ImageConstants'

interface LoginFormProps {
  className?: string
}

interface LoginWithCardProps {
  className?: string
  cardType: 'GOGGLE' | 'FB'
}

const LoginWithCard = (props: LoginWithCardProps): React.ReactElement => {
  const { className, cardType } = props

  const title = cardType === 'FB' ? 'Facebook' : 'Google'

  const renderLogo = (): React.ReactElement => {
    switch (cardType) {
      case 'FB':
        return <img src={images.facebookLogo} alt="Facebook" height={32} width={16} />
      case 'GOGGLE':
        return <img src={images.googleLogo} alt="Google" height={32} width={32} />
      default:
        return <img src={images.facebookLogo} alt="Facebook" height={32} width={16} />
    }
  }

  return (
    <div className={cn(Styles.loginWithCardStyles, className)}>
      {renderLogo()}
      <p className={Styles.cardTitleStyles}>Login with {title}</p>
    </div>
  )
}

const LoginForm = (props: LoginFormProps): React.ReactElement => {
  const { className } = props

  const renderTitle = (): React.ReactElement => (
    <p className={Styles.titleStyles}>
      Welcome to
      <br />
      <span className={Styles.subtitleStyles}>Unstop </span>
    </p>
  )

  const renderLoginWithSection = (): React.ReactElement => (
    <div className={Styles.loginWithSectionStyles}>
      <LoginWithCard cardType="GOGGLE" />
      <LoginWithCard cardType="FB" />
    </div>
  )

  return (
    <div className={cn(Styles.containerStyles, className)}>
      {renderTitle()}
      {renderLoginWithSection()}
      LoginForm
    </div>
  )
}

export default LoginForm
