import React from 'react'
import Link from 'next/link'
import { TabsTrigger } from '@components/ui/tabs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { LiaHomeSolid } from 'react-icons/lia'
import { FiUser } from 'react-icons/fi'
import { TfiEmail } from 'react-icons/tfi'
import { RxGear } from 'react-icons/rx'
import { VscSignOut } from 'react-icons/vsc'
import Image from 'next/image'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import MobileHeaderFooter from '@/components/Headers/MobileHeaderFooter'

type MobileViewType = {
  value: string
  icon: React.JSX.Element
  children: React.ReactNode
}

export function MobileTab({ value, icon, children }: MobileViewType) {
  return (
    <SheetClose asChild>
      <TabsTrigger
        value={value}
        className="text-secondary justify-start hover:text-primary active:scale-95"
      >
        {value === 'signOut' ? (
          <Link href="/" className="flex items-center gap-x-6">
            {icon}
            {children}
          </Link>
        ) : (
          <p className="flex items-center gap-x-6">
            {icon}
            {children}
          </p>
        )}
      </TabsTrigger>
    </SheetClose>
  )
}

function MobileSideBar() {
  return (
    <Sheet>
      <SheetTrigger className="absolute right-12 top-8 z-50">
        <FontAwesomeIcon icon={faBars} width={'24'} />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-screen flex-col justify-center pl-12"
      >
        <SheetTitle className="mb-8 mt-8">
          <Image src={'/navbar-logo.png'} alt="logo" width={200} height={200} />
        </SheetTitle>
        <p className="flex gap-x-2">
          <FontAwesomeIcon icon={faBars} width={'17'} />
          Dashboard
        </p>
        <Separator className="bg-gray-900" />
        <MobileTab value="main" icon={<LiaHomeSolid className="" />}>
          Main
        </MobileTab>
        <MobileTab value="profile" icon={<FiUser />}>
          Profile
        </MobileTab>
        <MobileTab value="inbox" icon={<TfiEmail />}>
          Inbox
        </MobileTab>
        <MobileTab value="security" icon={<RxGear />}>
          Security
        </MobileTab>
        <Separator className="bg-gray-900" />
        <MobileTab value="signOut" icon={<VscSignOut />}>
          Sign Out
        </MobileTab>
        <MobileHeaderFooter />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSideBar
