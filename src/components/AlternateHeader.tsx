import Link from 'next/link'
import MobileMenu from '@components/Headers/MobileHeader'
import DashboardHeader from './Headers/DashboardHeader'

import Logo from '@/components/SvgComponents/Logo'
import Image from 'next/image'
import ReturnPalTitle from '@/components/SvgComponents/ReturnPalTitle'
import { HeaderRoot, HeaderSub } from './common/header-alt'

export default function AlternateHeader() {
  return (
    <HeaderRoot>
      <HeaderSub>
        <Link href="/">
          <div className="flex items-center space-x-2">
            {/* <ReturnPalTitle className="hidden h-10 w-40 lg:flex" />
            <Logo className="h-7 w-7 shrink-0 fill-primary" /> */}
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
        <DashboardHeader />
      </HeaderSub>
    </HeaderRoot>
  )
}
