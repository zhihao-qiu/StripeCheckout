import React, { Fragment, useState } from 'react'
import DefaultLayout from '@/layouts/DefaultLayout'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { LiaHomeSolid } from 'react-icons/lia'
import { FiUser } from 'react-icons/fi'
import { TfiEmail } from 'react-icons/tfi'
import { RxGear } from 'react-icons/rx'
import { VscSignOut } from 'react-icons/vsc'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import DashBoardMain from '@/components/DashBoard/DashBoardMain'
import Profile from '@/components/DashBoard/Profile'
import Inbox from '@/components/DashBoard/Inbox'
import Security from '@/components/DashBoard/Security'
import { type UserInfo } from '@/components/DashBoard/types'
import LoadingSpinner from '@/components/LoadingSpinner'

const tabsTriggerClassName =
  'data-[state=active]:ml-6 data-[state=active]:scale-105 data-[state=active]:border-l-8 data-[state=active]:bg-paleBlue data-[state=active]:text-primary dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50 pl-10 justify-start text-sm sm:text-mediumText md:text-largeText xl:text-subtitle'

const tabsIconClassName = 'mr-2 h-12 w-12'
function Dashboard() {
  // TODO: replace this with global state management like Apollo Client cache
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: 'John',
    lastName: 'Doe',
    primaryAddress: {
      apartmentUnitNumber: '12A',
      streetNumber: 1234,
      streetName: 'Main St',
      city: 'Toronto',
      province: 'ON',
      postal: 'M1M1M1',
    },
    role: 'Platinum',
    email: 'john@example.com',
    additionalAddress: [
      {
        apartmentUnitNumber: '0',
        streetNumber: 999,
        streetName: 'Main St',
        city: 'Toronto',
        province: 'ON',
        postal: 'M1M1M1',
      },
      {
        streetNumber: 123,
        streetName: 'Main St',
        city: 'Toronto',
        province: 'ON',
        postal: 'M1M1M1',
      },
    ],
  })
  const tabsData = [
    {
      id: 1,
      title: 'Main',
      icon: <LiaHomeSolid className={tabsIconClassName} />,
      value: 'main',
    },
    {
      id: 2,
      title: 'Profile',
      icon: <FiUser className={tabsIconClassName} />,
      value: 'profile',
    },
    {
      id: 3,
      title: 'Inbox',
      icon: <TfiEmail className={tabsIconClassName} />,
      value: 'inbox',
    },
    {
      id: 4,
      title: 'Security',
      icon: <RxGear className={tabsIconClassName} />,
      value: 'security',
    },
    {
      id: 5,
      title: 'Sign Out',
      icon: <VscSignOut className={tabsIconClassName} />,
      value: 'signOut',
    },
  ]
  return (
    <Tabs defaultValue="main" className="h-full animate-in animate-out">
      <section className="flex">
        <TabsList className="flex h-full min-h-screen w-1/4 flex-col justify-center space-y-5 rounded-none bg-brand pb-40 text-white">
          <Link href="/" className="mb-16 p-4">
            <Image
              src={'/images/returnpal-logo.png'}
              alt="logo"
              width={200}
              height={200}
              className="mx-auto"
            />
          </Link>
          {tabsData.map((tab) => (
            <Fragment key={tab.id}>
              {tab.title === 'Sign Out' ? (
                <Separator key={`separator ${tab.id}`} className="mb-16" />
              ) : null}
              <TabsTrigger
                className={tabsTriggerClassName}
                value={tab.value}
                key={tab.id}
              >
                {tab.icon}
                {tab.title === 'Sign Out' ? (
                  <Link href={'/'} key={`link ${tab.id}`}>
                    <p className="ml-4 mt-2">{tab.title}</p>
                  </Link>
                ) : (
                  <p key={`p tag ${tab.id}`} className="ml-4 mt-2">
                    {tab.title}
                  </p>
                )}
              </TabsTrigger>
            </Fragment>
          ))}
        </TabsList>
        <TabsContent value="main" className="mt-0 min-h-screen w-3/4">
          <DashBoardMain userInfo={userInfo} />
        </TabsContent>
        <TabsContent value="profile" className="mt-0 min-h-screen w-3/4">
          <Profile setUserInfo={setUserInfo} userInfo={userInfo} />
        </TabsContent>
        <TabsContent value="inbox" className="mt-0 min-h-screen w-3/4">
          <Inbox />
        </TabsContent>
        <TabsContent value="security" className="mt-0 min-h-screen w-3/4">
          <Security />
        </TabsContent>
        {/* TODO - redirect when logout*/}
        <TabsContent value="signOut" className="mt-0 min-h-screen w-3/4">
          <div className="flex h-full items-center justify-center text-center">
            <LoadingSpinner />
          </div>
        </TabsContent>
      </section>
    </Tabs>
  )
}

Dashboard.getLayout = (page: React.ReactElement) => {
  return (
    <DefaultLayout isHeaderShow={false} isFooterShow={false}>
      {page}
    </DefaultLayout>
  )
}

export default Dashboard
