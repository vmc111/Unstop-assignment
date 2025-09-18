import cn from 'classnames'
import React from 'react'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa'

import { images } from '../../constants/ImageConstants'
import useLogin from '../../hooks/useLogin'

import * as Styles from './styles'

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
  const {
    username,
    email,
    password,
    remember,
    showPassword,
    loading,
    errors,
    setUsername,
    setEmail,
    setPassword,
    setRemember,
    toggleShowPassword,
    submit,
  } = useLogin()

  const renderDivider = (): React.ReactElement => (
    <div className={Styles.dividerContainerStyles}>
      <div className={Styles.dividerLineStyles} />
      <span className={Styles.dividerTextStyles}>OR</span>
      <div className={Styles.dividerLineStyles} />
    </div>
  )

  const renderUsername = (): React.ReactElement => (
    <div className={Styles.inputGroupStyles}>
      <label className={Styles.labelStyles}>User name</label>
      <div className={Styles.inputWrapperStyles}>
        <FaUser className={Styles.inputIconStyles} />
        <input
          className={Styles.inputStyles}
          type="text"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      {errors?.username ? (
        <span className={Styles.errorTextStyles}>* {errors.username}</span>
      ) : null}
    </div>
  )

  const renderEmail = (): React.ReactElement => (
    <div className={Styles.inputGroupStyles}>
      <label className={Styles.labelStyles}>Email</label>
      <div className={Styles.inputWrapperStyles}>
        <FaEnvelope className={Styles.inputIconStyles} />
        <input
          className={Styles.inputStyles}
          type="email"
          placeholder="username@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      {errors?.email ? <span className={Styles.errorTextStyles}>* {errors.email}</span> : null}
    </div>
  )

  const renderPassword = (): React.ReactElement => (
    <div className={Styles.inputGroupStyles}>
      <label className={Styles.labelStyles}>Password</label>
      <div className={Styles.inputWrapperStyles}>
        <FaLock className={Styles.inputIconStyles} />
        <input
          className={Styles.inputStyles}
          type={showPassword ? 'text' : 'password'}
          placeholder="********"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={toggleShowPassword}
          className="text-[#1C1B1F] cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {errors?.password ? (
        <span className={Styles.errorTextStyles}>* {errors.password}</span>
      ) : null}
    </div>
  )

  const renderActionsRow = (): React.ReactElement => (
    <div className={Styles.actionsRowStyles}>
      <label className={Styles.checkboxRowStyles}>
        <input
          type="checkbox"
          checked={remember}
          onChange={e => setRemember(e.target.checked)}
          className="cursor-pointer"
        />
        <span>Remember me</span>
      </label>
      <a className={Styles.forgotLinkStyles} href="#">
        Forgot Password?
      </a>
    </div>
  )

  const renderSubmit = (): React.ReactElement => (
    <div className="flex flex-col gap-y-2">
      <button
        type="button"
        className={Styles.submitButtonStyles}
        onClick={submit}
        disabled={!!loading}
      >
        {loading ? 'Logging in…' : 'Login'}
      </button>
      {errors?.api ? <span className={Styles.errorTextStyles}>* {errors.api}</span> : null}
    </div>
  )

  const renderFooter = (): React.ReactElement => (
    <p className={Styles.footerTextStyles}>
      Don’t have an account?{' '}
      <a className={Styles.footerLinkStyles} href="#">
        Register
      </a>
    </p>
  )

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
      {renderDivider()}
      <div className={Styles.formContainerStyles}>
        {renderUsername()}
        {renderEmail()}
        {renderPassword()}
        {renderActionsRow()}
        {renderSubmit()}
        {renderFooter()}
      </div>
    </div>
  )
}

export default LoginForm
