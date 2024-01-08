import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HeaderContent } from '@components/common/header-alt'
import { Button } from '@components/ui/button'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useRouter } from 'next/router'
import Image from 'next/image'

export type MenuItem = {
  title: string
  href: string
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
]

export default function DashboardHeader() {
  const pathname = usePathname()
  const router = useRouter()

  const handleDashboardClick = (e, href) => {
    e.preventDefault()
    router.push(href)
    if (router.pathname === href) {
      router.reload() // Reload the page if the current pathname matches the href
    }
  }

  return (
    <HeaderContent className="hidden justify-between align-middle md:flex">
      <div className="justify-left flex w-full shrink gap-x-4">
        {/* NOTE: This causes a hydration warning message because usePathname is a client component and therefore the class names will be different when rendered on the server. */}
        {menuItems.map((menuItem) => {
          return (
            <Link
              key={menuItem.href}
              href={menuItem.href}
              onClick={(e) => handleDashboardClick(e, menuItem.href)}
              style={{ color: 'white', marginLeft: '100px', fontSize: '150%' }}
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
        <Button variant="secondary" className="h-9 w-fit mt-2">
          Sign Out
        </Button>
        
        <FaRegCircleUser style={{ fontSize: '50px', color: '#d9d9d9' }} />
      </div>
    </HeaderContent>
  )
}
