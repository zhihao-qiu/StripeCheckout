import Link from 'next/link'
import MobileMenu from '@components/Headers/MobileHeader'
import DashboardHeaderLinks from './Headers/DashboardHeaderLinks'

import Image from 'next/image'
import { HeaderRoot, HeaderSub } from './common/dashboard-header'

export default function DashboardHeader() {
  return (
    <HeaderRoot>
      <HeaderSub>
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image
              src={'/images/returnpal-logo.png'}
              alt="logo"
              width="0"
              height="0"
              sizes="200px"
              style={{ width: 'auto', height: '100%' }}
              className="mx-auto"
            />
          </div>
        </Link>
        <MobileMenu />
        <DashboardHeaderLinks />
      </HeaderSub>
    </HeaderRoot>
  )
}
