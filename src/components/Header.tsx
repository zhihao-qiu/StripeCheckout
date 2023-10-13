import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { MoveRight } from 'lucide-react'
import MobileMenu from './Header/MobileMenu'

export default function Header() {
  return (
    <header>
      <div className="sticky top-0 z-50 flex w-screen border-b border-white bg-white px-9 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="flex h-20 w-full items-center justify-between space-x-3">
          <Image src={'/navbar-logo.png'} alt="logo" width={200} height={200} />
          <MobileMenu />
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
