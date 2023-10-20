import React, { Fragment } from 'react'
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

const tabsTriggerClassName =
  'data-[state=active]:ml-6 data-[state=active]:scale-105 data-[state=active]:border-l-8 data-[state=active]:bg-paleBlue data-[state=active]:text-primary dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50 pl-10 justify-start'

const tabsIconClassName = 'mr-2 h-12 w-12'
function Dashboard() {
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
                <p key={`p tag ${tab.id}`} className="ml-4 mt-2">
                  {tab.title}
                </p>
              </TabsTrigger>
            </Fragment>
          ))}
        </TabsList>
        <TabsContent value="main" className="mt-0 min-h-screen w-3/4">
          <DashBoardMain />
        </TabsContent>
        <TabsContent value="profile" className="mt-0 min-h-screen w-3/4">
          <Profile />
        </TabsContent>
        <TabsContent value="inbox" className="mt-0 min-h-screen w-3/4">
          <Inbox />
        </TabsContent>
        <TabsContent value="security" className="mt-0 min-h-screen w-3/4">
          <Security />
        </TabsContent>
        <TabsContent value="signOut" className="mt-0 min-h-screen w-3/4">
          signOut
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
