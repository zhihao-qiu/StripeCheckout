import Image from 'next/image'
import { Button } from './ui/button'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div className="sticky top-0 z-50 flex w-screen border-b border-white bg-white px-9 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="flex h-20 w-full items-center justify-between space-x-3">
          <Image src={'/navbar-logo.png'} alt="logo" width={200} height={200} />

          <div className="flex gap-x-3">
            <div className="flex items-center justify-center gap-x-12">
              <Link href="/" className="font-bold text-primary drop-shadow-lg">
                About Us
              </Link>
              <Link
                href="/"
                className="text-secondary font-bold drop-shadow-lg"
              >
                Pricing
              </Link>
              <Link
                href="/"
                className="text-secondary font-bold drop-shadow-lg"
              >
                How it Works
              </Link>
            </div>
          </div>
          <div className="flex gap-x-3">
            <Button variant={'secondary'} className="h-9">
              Sign In
              <MoveRight className="w-5" />
            </Button>
            <Button className="h-9">Schedule a Pickup</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
