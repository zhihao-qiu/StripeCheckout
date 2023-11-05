import React from 'react'
import { Button } from '@/components/ui/button'
import NounDelivery from '@/components/SvgComponents/NounDelivery'
import Link from 'next/link'
import { type UserInfo } from '@/components/DashBoard/types'
import { planTextClassName } from '@/components/Plan'
import Reveal from '@components/common/reveal'

function DashBoardMain({ userInfo }: { userInfo: UserInfo }) {
  return (
    <section className="flex flex-col justify-center space-y-16 p-2 sm:p-10 md:p-36">
      <Reveal>
        <h3 className="text-title">
          Welcome back,{' '}
          <span
            className={`${planTextClassName(
              userInfo.role
            )} text-title sm:text-title`}
          >
            {userInfo.role}
          </span>{' '}
          user <span className="font-bold text-primary">John</span>
        </h3>
      </Reveal>
      <Reveal width="100%">
        <div className="flex rounded-3xl bg-brand p-8 text-subtitle">
          <div className="flex w-full flex-col space-y-5 md:w-4/5">
            <Reveal>
              <h3 className="text-start text-white">
                Ready to schedule your pickup?
              </h3>
            </Reveal>
            <Link href={'/return'}>
              <Reveal>
                <Button className="w-fit px-8">Schedule Pickup</Button>
              </Reveal>
            </Link>
          </div>
          <Reveal>
            <div className="hidden w-1/5 lg:block">
              <NounDelivery />
            </div>
          </Reveal>
        </div>
      </Reveal>
    </section>
  )
}

export default DashBoardMain
