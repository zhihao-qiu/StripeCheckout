import Image from 'next/image'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Combine,
  Calculator,
  Users2,
  Unplug,
  Truck,
  MenuSquare,
} from 'lucide-react'
import MobileMenuFooter from './MobileMenuFooter'

function MobileMenu() {
  return (
    <nav className="w-full px-2 pt-2 md:hidden">
      <Sheet>
        <SheetTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-10 w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
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
          <p className="flex w-[70%] gap-x-2 border-b border-b-grey pb-2">
            <MenuSquare className="w-5" />
            Menu
          </p>
          <SheetClose asChild>
            <Link href="/" className="text-secondary hover:text-primary">
              <p className="flex gap-x-2">
                <Combine className="w-5" />
                How it Works
              </p>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/" className="text-secondary  hover:text-primary">
              <p className="flex gap-x-2">
                <Calculator className="w-5" />
                Pricing
              </p>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/about" className="text-secondary hover:text-primary">
              <p className="flex gap-x-2">
                <Users2 className="w-5" />
                About Us
              </p>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/sign-in" className="text-secondary hover:text-primary">
              <p className="flex gap-x-2">
                <Unplug className="w-5" />
                Sign In
              </p>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/" className="text-secondary hover:text-primary">
              <p className="flex gap-x-2">
                <Truck className="w-5" />
                Schedule Pickup
              </p>
            </Link>
          </SheetClose>
          <MobileMenuFooter />
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileMenu
