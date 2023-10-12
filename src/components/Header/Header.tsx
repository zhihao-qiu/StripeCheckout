import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Header() {
  return (
    <div className="fixed left-0 top-0 flex h-16 w-full flex-row items-center justify-between bg-white">
      <div className="flex-3">
        <h1 className="text-subtitle font-bold">Reture-Pal</h1>
      </div>
      <div className="flex-7 flex items-center justify-between space-x-6">
        <Link href="/howitworks" className="text-brand hover:underline">
          How It Works
        </Link>
        <Link href="/pricing" className="text-brand hover:underline">
          Pricing
        </Link>
        <Link href="/aboutUs" className="text-brand hover:underline">
          About Us
        </Link>
        <Button type="button">Login</Button>
      </div>
    </div>
  )
}

export default Header
