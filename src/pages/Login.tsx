import { images } from '../constants/ImageConstants'
import LoginForm from '../components/LoginForm/LoginForn'

export default function Login() {
  const renderBannerImage = (): React.ReactElement => (
    <div className="max-w-[540px] max-h-[540px] overflow-hidden flex-1 md:block hidden">
      <img src={images.illustrationImage} alt="Illustration" />
    </div>
  )

  return (
    <div className="h-[100dvh] w-full bg-[#F4F4F4] flex items-center justify-center p-[24px] md:p-[75px_74px] overflow-y-auto scrollbar-hidden md:overflow-hidden">
      {renderBannerImage()}
      <LoginForm className="flex-1 h-fit md:max-h-[80dvh] md:overflow-y-auto scrollbar-hidden lg:max-w-[50dvw]" />
    </div>
  )
}
