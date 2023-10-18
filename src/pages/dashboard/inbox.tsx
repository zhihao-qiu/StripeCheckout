import React from 'react'
import DefaultLayout from '@/layouts/DefaultLayout'

function inbox() {
  return <div>inbox</div>
}

export default inbox

inbox.getLayout = (page: React.ReactElement) => {
  return (
    <DefaultLayout isFooterShow={false} isHeaderShow={false}>
      {page}
    </DefaultLayout>
  )
}
