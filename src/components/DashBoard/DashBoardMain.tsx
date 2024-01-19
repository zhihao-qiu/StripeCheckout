import React from 'react'
import { type UserInfo } from '@/components/DashBoard/types'
import Reveal from '@components/common/reveal'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
// import Profile from '@/components/DashBoard/Profile'
import { CiCalendar } from 'react-icons/ci'
import { FaRegCircleUser, FaRegClock } from 'react-icons/fa6'
import RecentOrders from '@components/Orders/RecentOrders'
function DashBoardMain({
  userInfo,
  setUserInfo,
}: {
  userInfo: UserInfo
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
}) {
  const cardClassnames =
    'border-l-0 border-r-0 border-t-0 border-b-0 border-black flex h-23  w-300 sm:w-1/3 md:w-1/3 lg:w-1/4 md:min-w-300 select-none flex-row items-center p-1 bg-white mr-50 text-brand '
  const cardTitleClassnames = 'text-xl md:text-2xl font-semibold '
  const cardDescriptionClassNames = 'text-sm text-brand md:text-xl'
  const router = useRouter()
  const handleRedirect = (path: string) => {
    router.push(path)
  }

  return (
    <section className="lg:p-30 flex flex-col justify-center space-y-8  p-20 lg:space-y-16">
      <div>
        <Reveal>
          <h3 className="mb-6 text-subtitle font-bold lg:text-5xl">
            Your Dashboard
          </h3>
        </Reveal>
        <div className="justify-left mb-12 flex">
          <Card
            onClick={() => handleRedirect('/return')}
            className={`${cardClassnames} mr-4`}
            style={{ borderLeft: '16px solid black' }}
          >
            <CardHeader className="flex items-center pl-5">
              <Reveal>
                <div className="flex items-center">
                  <div className="mr-4">
                    <Reveal>
                      <CiCalendar className="fill-secondary h-12 w-12 xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" />
                    </Reveal>
                  </div>
                  <div>
                    <CardTitle className={cardTitleClassnames}>
                      Schedule Pickup
                    </CardTitle>
                    <Reveal>
                      <CardDescription className={cardDescriptionClassNames}>
                        Set up a new pickup for your returns.
                      </CardDescription>
                    </Reveal>
                  </div>
                </div>
              </Reveal>
            </CardHeader>
          </Card>
          <Card
            onClick={() => handleRedirect('/return')}
            className={`${cardClassnames} mr-4`}
            style={{ borderLeft: '16px solid black' }}
          >
            <CardHeader className="flex items-center pl-5">
              <Reveal>
                <div className="flex items-center">
                  <div className="mr-4">
                    <Reveal>
                      <FaRegClock className="fill-secondary h-12 w-12 xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" />
                    </Reveal>
                  </div>
                  <div>
                    <CardTitle className={cardTitleClassnames}>
                      View Recent Orders
                    </CardTitle>
                    <Reveal>
                      <CardDescription className={cardDescriptionClassNames}>
                        View all your recently scheduled orders here.
                      </CardDescription>
                    </Reveal>
                  </div>
                </div>
              </Reveal>
            </CardHeader>
          </Card>
          <Card
            className={`${cardClassnames}`}
            style={{ borderLeft: '16px solid black' }}
          >
            <CardHeader className="flex items-center pl-5">
              <Reveal>
                <div className="flex items-center">
                  <div className="mr-4">
                    <Reveal>
                      <FaRegCircleUser className="fill-secondary h-12 w-12 xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" />
                    </Reveal>
                  </div>
                  <div>
                    <CardTitle className={cardTitleClassnames}>
                      Manage Account
                    </CardTitle>
                    <Reveal>
                      <CardDescription className={cardDescriptionClassNames}>
                        Edit your profile setting and subscriptions here.
                      </CardDescription>
                    </Reveal>
                  </div>
                </div>
              </Reveal>
            </CardHeader>
          </Card>
        </div>
        <RecentOrders />
      </div>
    </section>
  )
}
export default DashBoardMain
