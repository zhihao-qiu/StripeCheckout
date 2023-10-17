import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { HeaderContent } from './Header'
import { useMemo } from 'react'

export type MenuItem = {
  title: string
  href: string
}

const menuItems: MenuItem[] = [
  {
    title: 'How it Works',
    href: '/howitworks',
  },
  {
    title: 'Pricing',
    href: '/pricing',
  },
  {
    title: 'About Us',
    href: '/about',
  },
  {
    title: 'Contact Us',
    href: '/contact',
  },
]

export default function DesktopHeader() {
  const pathname = usePathname()
  const menuLinksMemo = useMemo(() => {
    return menuItems.map((menuItem) => {
      return (
        <Link
          key={menuItem.href}
          href={menuItem.href}
          className={cn(
            'text-secondary shrink font-bold drop-shadow-lg',
            pathname === menuItem.href && 'text-primary'
          )}
        >
          {menuItem.title}
        </Link>
      )
    })
  }, [pathname])
  return (
    <HeaderContent className="hidden justify-between align-middle md:flex">
      <div className="flex w-full shrink justify-center gap-x-4">
        {menuLinksMemo}
      </div>
      <div className="flex space-x-2 lg:space-x-5">
        <Button variant={'secondary'} className="h-9 w-24">
          Sign In
        </Button>
        <Button className="h-9 w-36">Schedule Pickup</Button>
      </div>
    </HeaderContent>
  )
}
