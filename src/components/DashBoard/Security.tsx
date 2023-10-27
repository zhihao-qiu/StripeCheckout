import React from 'react'
import DashBoardHeader from '@/components/DashBoard/DashBoardHeader'

function Security() {
  return (
    <>
      <DashBoardHeader
        firstName="John"
        lastName="Doe"
        email="john@example.com"
      />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Security</h1>
        <p className="text-xl">Coming soon...</p>
      </div>
    </>
  )
}

export default Security
