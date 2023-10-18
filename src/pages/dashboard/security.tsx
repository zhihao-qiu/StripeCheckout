import React from 'react'
import DefaultLayout from '@/layouts/DefaultLayout'

function security() {
  return <div>security</div>
}

export default security

security.getLayout = (page: React.ReactElement) => {
  return (
    <DefaultLayout isHeaderShow={false} isFooterShow={false}>
      {page}
    </DefaultLayout>
  )
}
