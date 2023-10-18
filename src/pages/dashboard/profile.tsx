import React from 'react'
import DefaultLayout from '@/layouts/DefaultLayout'

function profile() {
  return <div>profile</div>
}

export default profile

profile.getLayout = (page: React.ReactElement) => {
  return (
    <DefaultLayout isHeaderShow={false} isFooterShow={false}>
      {page}
    </DefaultLayout>
  )
}
