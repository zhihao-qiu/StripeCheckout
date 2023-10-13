import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import {
  MoveRight,
  Combine,
  Calculator,
  Users2,
  Unplug,
  Truck,
  MenuSquare,
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export default function Header() {
  return (
    <header>
      <div className="sticky top-0 z-50 flex w-screen border-b border-white bg-white px-9 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="flex h-20 w-full items-center justify-between space-x-3">
          <Image src={'/navbar-logo.png'} alt="logo" width={200} height={200} />

          {/* mobile hamburger menu */}
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
                <p className="flex w-[55%] gap-x-2 border-b border-b-grey pb-2">
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
                  <Link
                    href="/about"
                    className="text-secondary hover:text-primary"
                  >
                    <p className="flex gap-x-2">
                      <Users2 className="w-5" />
                      About Us
                    </p>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/sign-in"
                    className="text-secondary hover:text-primary"
                  >
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
              </SheetContent>
            </Sheet>
          </nav>

          <div className="hidden w-full max-w-[35%] justify-between md:flex">
            <Link href="/" className="text-secondary font-bold drop-shadow-lg">
              How it Works
            </Link>
            <Link
              href="/about"
              className="text-secondary font-bold drop-shadow-lg"
            >
              Pricing
            </Link>
            <Link href="/" className="font-bold text-primary drop-shadow-lg">
              About Us
            </Link>
          </div>
          <div className="hidden w-full max-w-[25%] justify-evenly gap-x-2 md:flex">
            <Button variant={'secondary'} className="h-9 whitespace-nowrap">
              Sign In
              <MoveRight className="w-5" />
            </Button>
            <Button className="h-9 whitespace-nowrap">Schedule a Pickup</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
