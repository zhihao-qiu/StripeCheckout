import React, { Fragment, useState, useEffect } from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import DashBoardMain from '@/components/DashBoard/DashBoardMain'
import { type UserInfo } from '@/components/DashBoard/types'
import { dummyUser } from './dummy-user'

function Dashboard() {
  // const { readUserInfoFromFragment } = useAuth()

  // const userInCache = readUserInfoFromFragment()

  // TODO: replace this with global state management like Apollo Client cache
  const [userInfo, setUserInfo] = useState<UserInfo>(dummyUser)

  //   // TODO: replace this with Apollo client query instead of fragment
  //   useEffect(() => {
  //     setUserInfo((preV) => {
  //       return userInCache
  //         ? {
  //             firstName: userInCache.user.firstName,
  //             lastName: userInCache.user.lastName,
  //             primaryAddress: {
  //               streetNumber: userInCache.primaryAddress.streetNumber,
  //               streetName: userInCache.primaryAddress.streetName,
  //               city: userInCache.primaryAddress.city,
  //               province: userInCache.primaryAddress.province,
  //               postal: userInCache.primaryAddress.postal,
  //             },
  //             role: userInCache.user.role,
  //             email: userInCache.user.email,
  //           }
  //         : preV
  //     })
  //   }, [userInCache])

  return <DashBoardMain userInfo={userInfo} setUserInfo={setUserInfo} />
}

Dashboard.getLayout = (page: React.ReactElement) => {
  return (
    <DashboardLayout isHeaderShow={true} isFooterShow={false}>
      {page}
    </DashboardLayout>
  )
}

export default Dashboard
