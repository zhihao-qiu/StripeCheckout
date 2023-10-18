import Image from 'next/image'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import MobileHeaderFooter from './MobileHeaderFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  type IconDefinition,
  faBars,
  faCircleInfo,
  faUsers,
  faTruck,
  faTags,
} from '@fortawesome/free-solid-svg-icons'
import { type PropsWithChildren } from 'react'
import { HeaderContent } from './Header'
import { Separator } from '../ui/separator'
import SigninModal from '../SigninModal'

type MobileViewType = PropsWithChildren & {
  href: string
  icon: IconDefinition
}

export function MobileLink({ href, icon, children }: MobileViewType) {
  return (
    <SheetClose asChild>
      <Link href={href} className="text-secondary hover:text-primary">
        <p className="flex gap-x-2">
          <FontAwesomeIcon icon={icon} width={'17'} />
          {children}
        </p>
      </Link>
    </SheetClose>
  )
}

export default function MobileMenu() {
  return (
    <HeaderContent className="justify-end md:hidden">
      <Sheet>
        <SheetTrigger>
          <FontAwesomeIcon icon={faBars} width={'20'} />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex w-screen flex-col items-start justify-start pl-12"
        >
          <SheetTitle className="mb-8 mt-8">
            <Image
              src={'/navbar-logo.png'}
              alt="logo"
              width={200}
              height={200}
            />
          </SheetTitle>
          <p className="flex gap-x-2">
            <FontAwesomeIcon icon={faBars} width={'17'} />
            Menu
          </p>
          <Separator className="bg-gray-900" />
          <MobileLink href="/" icon={faCircleInfo}>
            How it Works
          </MobileLink>
          <MobileLink href="/temp-dashboard" icon={faTags}>
            Pricing
          </MobileLink>
          <MobileLink href="/" icon={faUsers}>
            About Us
          </MobileLink>

          <SigninModal headerType="mobile" />
          <MobileLink href="/" icon={faTruck}>
            Schedule Pickup
          </MobileLink>
          <MobileHeaderFooter />
        </SheetContent>
      </Sheet>
    </HeaderContent>
  )
}
