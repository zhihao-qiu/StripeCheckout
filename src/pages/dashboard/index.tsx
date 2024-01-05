import React, { Fragment, useState, useEffect } from 'react'
import DefaultLayout from '@/layouts/DefaultLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
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
import useAuth from '@/services/authentication/useAuth'
import MobileSideBar from '@components/DashBoard/MobileSideBar'

const tabsTriggerClassName =
  'data-[state=active]:ml-6 data-[state=active]:scale-105 data-[state=active]:border-l-8 data-[state=active]:bg-paleBlue data-[state=active]:text-primary dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50 pl-10 justify-start text-sm md:text-lg lg:text-mediumText xl:text-subtitle'

const tabsIconClassName = 'mr-2 h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12'
function Dashboard() {
  const { readUserInfoFromFragment } = useAuth()

  const userInCache = readUserInfoFromFragment()

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

  // TODO: replace this with Apollo client query instead of fragment
  useEffect(() => {
    setUserInfo((preV) => {
      return userInCache
        ? {
            firstName: userInCache.user.firstName,
            lastName: userInCache.user.lastName,
            primaryAddress: {
              streetNumber: userInCache.primaryAddress.streetNumber,
              streetName: userInCache.primaryAddress.streetName,
              city: userInCache.primaryAddress.city,
              province: userInCache.primaryAddress.province,
              postal: userInCache.primaryAddress.postal,
            },
            role: userInCache.user.role,
            email: userInCache.user.email,
          }
        : preV
    })
  }, [userInCache])

  return (
    <DashBoardMain userInfo={userInfo} setUserInfo={setUserInfo} />
    // <Tabs defaultValue="main" className="h-full animate-in animate-out">
    //   <section className="flex">
    //     <TabsList className="hidden h-full min-h-screen w-1/4 flex-col justify-center space-y-5 rounded-none bg-brand pb-40 text-white md:flex">
    //       <Link href="/" className="mb-16 p-4">
    //         <Image
    //           src={'/images/returnpal-logo.png'}
    //           alt="logo"
    //           width="0"
    //           height="0"
    //           sizes="200px"
    //           style={{ width: 'auto', height: '100%' }}
    //           className="mx-auto"
    //         />
    //       </Link>
    //       {tabsData.map((tab) => (
    //         <Fragment key={tab.id}>
    //           {/* Render a Separator on top when tap is "Sign Out" */}
    //           {tab.title === 'Sign Out' ? (
    //             <Separator key={`separator ${tab.id}`} className="mb-16" />
    //           ) : null}
    //           <TabsTrigger
    //             className={tabsTriggerClassName}
    //             value={tab.value}
    //             key={tab.id}
    //           >
    //             {tab.icon}
    //             {tab.title === 'Sign Out' ? (
    //               <Link href={'/'} key={`link ${tab.id}`}>
    //                 <p className="ml-4 mt-2">{tab.title}</p>
    //               </Link>
    //             ) : (
    //               <p key={`p tag ${tab.id}`} className="ml-4 mt-2">
    //                 {tab.title}
    //               </p>
    //             )}
    //           </TabsTrigger>
    //         </Fragment>
    //       ))}
    //     </TabsList>

    //     <TabsList className="flex p-0 md:hidden">
    //       <MobileSideBar />
    //     </TabsList>

    //     <TabsContent value="main" className="mt-0 min-h-screen w-full md:w-3/4">
    //       <DashBoardMain userInfo={userInfo} setUserInfo={setUserInfo} />
    //     </TabsContent>
    //     <TabsContent
    //       value="profile"
    //       className="mt-0 min-h-screen w-full md:w-3/4"
    //     >
    //       <Profile setUserInfo={setUserInfo} userInfo={userInfo} />
    //     </TabsContent>
    //     <TabsContent
    //       value="inbox"
    //       className="mt-0 min-h-screen w-full md:w-3/4"
    //     >
    //       <Inbox userInfo={userInfo} />
    //     </TabsContent>
    //     <TabsContent
    //       value="security"
    //       className="mt-0 min-h-screen w-full md:w-3/4"
    //     >
    //       <Security userInfo={userInfo} />
    //     </TabsContent>
    //     {/* TODO - redirect when logout*/}
    //     <TabsContent
    //       value="signOut"
    //       className="mt-0 min-h-screen w-full md:w-3/4"
    //     >
    //       <div className="flex h-full items-center justify-center text-center">
    //         <LoadingSpinner />
    //       </div>
    //     </TabsContent>
    //   </section>
    // </Tabs>
  )
}

Dashboard.getLayout = (page: React.ReactElement) => {
  return (
    <DashboardLayout isHeaderShow={true} isFooterShow={false}>
      {page}
    </DashboardLayout>
  )
}

export default Dashboard
