import React from 'react'
import DefaultLayout from '@/layouts/DefaultLayout'

function Dashboard() {
  return <div>dashboard</div>
}

Dashboard.getLayout = (page: React.ReactElement) => {
  return (
    <DefaultLayout isHeaderShow={false} isFooterShow={false}>
      {page}
    </DefaultLayout>
  )
}

export default Dashboard
