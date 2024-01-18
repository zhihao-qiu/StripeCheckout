import React, { useState } from 'react'
import { type UserInfo } from '@/components/DashBoard/types'
import Reveal from '@components/common/reveal'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import Profile from '@/components/DashBoard/Profile'
import { CiCalendar } from 'react-icons/ci'
import { FaRegCircleUser, FaRegClock } from 'react-icons/fa6'

function DashBoardMain({
  userInfo,
  setUserInfo,
}: {
  userInfo: UserInfo
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
}) {
  const [showProfile, setShowProfile] = useState(false)
  const cardClassnames =
    'border-l-0 border-r-0 border-t-0 border-b-0  border-black flex h-23 md:w-3/4 select-none flex-row items-center p-4 bg-white mr-100 text-brand'
  const cardTitleClassnames = 'text-xl md:text-2xl font-semibold '
  const cardDescriptionClassNames = 'text-sm text-brand'
  const router = useRouter()
  const handleRedirect = (path: string) => {
    router.push(path)
  }
  const handleProfileClick = () => {
    setShowProfile(true)
  }
  return (
    <section className="lg:p-30 flex flex-col justify-center space-y-8  p-20 lg:space-y-16">
      <Reveal>
        <h3 className="text-subtitle lg:text-title">
          Welcome back,{' '}
          <span
            className={`${planTextClassName(
              userInfo.subscription
            )} text-subtitle sm:text-subtitle lg:text-title`}
          >
            {userInfo.subscription}
          </span>{' '}
          user{' '}
          <span className="font-bold text-primary">{userInfo.firstName}</span>
        </h3>
      </Reveal>
      <Reveal width="100%">
        <div className="flex rounded-3xl bg-brand p-8 text-subtitle">
          <div className="flex w-full flex-col space-y-5 md:w-4/5">
            <Reveal>
              <h3 className="text-start text-sm text-white sm:text-lg lg:text-subtitle xl:text-4xl">
                Ready to schedule your pickup?
              </h3>
            </Reveal>
            <Link href={'/return'}>
              <Reveal>
                <Button className="w-fit px-8">Schedule Pickup</Button>
              </Reveal>
            </Link>
          </div>
          <Reveal>
            <div className="hidden w-1/5 lg:block">
              <NounDelivery />
            </div>
          </Reveal>
        </div>
      )}
      {showProfile && <Profile userInfo={userInfo} setUserInfo={setUserInfo} />}
    </section>
  )
}
export default DashBoardMain
