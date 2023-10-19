import FastTruck from '@/components/SvgComponents/FastTruck'
import { Button } from '@/components/ui/button'
import { getLayout } from '@/layouts/ReturnProcessLayout'
import { link } from 'fs'
import { X } from 'lucide-react'
import Link from 'next/link'

interface Order {
  name: string
  orderRef: string
  email: string
  location: string
  pickupDate: string
  pickupMethod: string
  totalPackages: number
  cardType: string
  cardNumber: number
}

const mockOrder: Order = {
  name: 'John',
  orderRef: 'R957394',
  email: 'johndoe2394@gmail.com',
  location: '6500 Boulevard de Rome, Brossard, QC J4Y 0B6',
  pickupDate: 'Mon, Sep 25th',
  pickupMethod: 'Direct Handoff',
  totalPackages: 1,
  cardType: 'Visa',
  cardNumber: 4832,
}

export default function Confirmation() {
  return (
    <div className="flex w-full flex-col items-center justify-start md:tracking-wide">
      <section className="relative my-4 w-11/12 text-base text-brand sm:mb-10 sm:mt-12 sm:w-2/3 sm:pr-12 sm:text-smallText">
        <p className="mb-2 w-5/6 text-smallText sm:w-full sm:text-subtitle">
          <span className="font-bold text-primary">Thank you</span> for
          scheduling a return pickup with us!
        </p>
        <p className="mb-2">
          {mockOrder.name}, your pickup order{' '}
          <span className="font-bold text-primary">#{mockOrder.orderRef}</span>{' '}
          is confirmed
        </p>
        <p>
          A confirmation email will be sent to:{' '}
          <span className="font-bold text-primary">{mockOrder.email}</span>
        </p>
        <Link
          href="/"
          className="absolute -right-6 -top-2 sm:-top-4 sm:right-0"
        >
          <Button
            variant="link"
            className="scale-75 text-primary hover:text-gradientL sm:scale-100"
          >
            <X size={44} strokeWidth={1} />
          </Button>
        </Link>
      </section>

      <div className="mb-8 flex w-11/12 flex-col justify-between text-base text-brand sm:w-2/3 sm:gap-x-4 sm:text-smallText md:flex-row">
        <section className="h-fit rounded-3xl border-2 border-primary bg-white p-4 sm:p-8">
          <p className="mb-2 sm:mb-4">
            <span className="font-bold">Location:</span> {mockOrder.location}
          </p>
          <p className="mb-2 sm:mb-4">
            <span className="font-bold">Pickup Date:</span>{' '}
            {mockOrder.pickupDate}
          </p>
          <p className="mb-2 sm:mb-4">
            <span className="font-bold">Pickup Method:</span>{' '}
            {mockOrder.pickupMethod}
          </p>
          <p className="mb-2 sm:mb-4">
            <span className="font-bold">Total Packages:</span>{' '}
            {mockOrder.totalPackages}
          </p>
          <p className="mb-0">
            <span className="font-bold">Payment Method:</span>{' '}
            {mockOrder.cardType} ending in {mockOrder.cardNumber}
          </p>
        </section>
        <section className="flex flex-col items-center justify-end">
          <div className="scale-90 sm:scale-100">
            <FastTruck />
          </div>
          <div>
            <Link href="/">
              <Button className="mt-0 whitespace-nowrap px-8 text-base tracking-wider sm:mt-8">
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

Confirmation.getLayout = getLayout
