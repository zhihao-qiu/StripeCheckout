import React from 'react'
import { getLayout } from '@/layouts/DefaultLayout'

function Home() {
  return (
    <>
      <div className="flex">
        <div>desc</div>
        <div>img container</div>
      </div>
    </>
  )
}

export default Home

Home.getLayout = getLayout
