import FastTruck from '@/components/SvgComponents/FastTruck'
import {
  ReturnProcessRoot,
  ReturnProcessSection,
} from '@/components/common/return-process'
import {
  SectionDescription,
  SectionHeader,
  SectionHeaderHighlight,
} from '@/components/common/section'
import { Button } from '@/components/ui/button'
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
    <ReturnProcessRoot className="flex w-full flex-col items-center">
      <ReturnProcessSection className="relative my-4 w-full text-base text-brand sm:mb-10 sm:mt-12 sm:w-2/3 sm:pr-12 sm:text-smallText">
        <SectionHeader className="mb-2 w-full text-smallText sm:text-subtitle">
          <SectionHeaderHighlight>Thank you</SectionHeaderHighlight> for
          scheduling a return pickup with us!
        </SectionHeader>
        <SectionDescription>
          {mockOrder.name}, your pickup order{' '}
          <SectionHeaderHighlight>#{mockOrder.orderRef}</SectionHeaderHighlight>{' '}
          is confirmed.
        </SectionDescription>
        <SectionDescription>
          A confirmation email will be sent to:{' '}
          <SectionHeaderHighlight>#{mockOrder.email}</SectionHeaderHighlight>
        </SectionDescription>
      </ReturnProcessSection>

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
    </ReturnProcessRoot>
  )
}
