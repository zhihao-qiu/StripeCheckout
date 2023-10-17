import Link from 'next/link'
import { HeaderRoot, HeaderSub } from '@components/Headers/Header'
import MobileMenu from '@components/Headers/MobileHeader'
import DesktopHeader from '@components/Headers/DesktopHeader'

import Logo from '@/components/SvgComponents/Logo'
import ReturnPalTitle from '@/components/SvgComponents/ReturnPalTitle'

export default function Header() {
  return (
    <HeaderRoot>
      <HeaderSub>
        <Link href="/">
          <div className="flex items-center space-x-2">
            <ReturnPalTitle className="hidden h-10 w-40 lg:flex" />
            <Logo className="h-7 w-7 shrink-0 fill-primary" />
          </div>
        </Link>
        <MobileMenu />
        <DesktopHeader />
      </HeaderSub>
    </HeaderRoot>
  )
}
