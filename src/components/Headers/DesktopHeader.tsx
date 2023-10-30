import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SigninModal from '@/components/SigninModal'
import { HeaderContent } from '@components/common/header'
import { Button } from '@components/ui/button'

export type MenuItem = {
  title: string
  href: string
}

const menuItems: MenuItem[] = [
  {
    title: 'About Us',
    href: '/about',
  },
  {
    title: 'Contact Us',
    href: '/contact',
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
]

export default function DesktopHeader() {
  const pathname = usePathname()
  return (
    <HeaderContent className="hidden justify-between align-middle md:flex">
      <div className="flex w-full shrink justify-center gap-x-4">
        {/* NOTE: This causes a hydration warning message because usePathname is a client component and therefore the class names will be different when rendered on the server. */}
        {menuItems.map((menuItem) => {
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
        })}
      </div>
      <div className="flex space-x-2 lg:space-x-5">
        <SigninModal headerType="desktop" />
        <Link href="/return">
          <Button className="h-9 w-36">Schedule Pickup</Button>
        </Link>
      </div>
    </HeaderContent>
  )
}
