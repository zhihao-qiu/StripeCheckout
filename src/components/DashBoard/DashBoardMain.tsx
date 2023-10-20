import React from 'react'
import { Button } from '@/components/ui/button'
import NounDelivery from '@/components/SvgComponents/NounDelivery'

function DashBoardMain() {
  return (
    <section className="flex flex-col justify-center space-y-16 p-36">
      <h3 className="text-title">
        Welcome back, <span className="font-bold text-primary">John</span>
      </h3>
      <div className="flex rounded-3xl bg-brand p-8 text-subtitle">
        <div className="flex w-4/5 flex-col space-y-5">
          <h3 className="text-start text-white">
            Ready to schedule your pickup?
          </h3>
          <Button className="w-fit px-8">Schedule Pickup</Button>
        </div>
        <NounDelivery />
      </div>
    </section>
  )
}

export default DashBoardMain
