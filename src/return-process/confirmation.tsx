import FastTruck from '@/components/SvgComponents/FastTruck'
import {
  ReturnProcessRoot,
  ReturnProcessSection,
} from '@/components/common/return-process'
import {
  SectionDescription,
  SectionHeaderHighlight,
} from '@/components/common/section'
import { Button } from '@/components/ui/button'
import CloseX from '@components/SvgComponents/CloseX'
import Link from 'next/link'
import Reveal from '@components/common/reveal'
import { useReturnProcess } from '@/hooks/useReturnProcess'

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

const order: Order = {
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
  const returnProcess = useReturnProcess()

  return (
    <ReturnProcessRoot className="mb-4 flex w-full flex-col items-center space-y-2 pt-2 sm:space-y-8 sm:pt-6 md:pt-10 lg:pt-16">
      <ReturnProcessSection className="relative mt-0 w-full space-y-1 text-base text-brand sm:my-2 sm:w-5/6 sm:space-y-3 sm:pr-12 md:my-4 md:text-smallText">
        <div className="absolute right-2 top-2 h-6 w-6 text-primary sm:h-9 sm:w-9 md:h-12 md:w-12">
          <Link href="/dashboard">
            <Reveal width="100%" center={true}>
              <CloseX />
            </Reveal>
          </Link>
        </div>
        <Reveal>
          <div className="mb-2 w-11/12 text-smallText font-normal text-brand sm:w-full md:text-4xl">
            <SectionHeaderHighlight className="text-smallText font-bold text-primary md:text-4xl">
              Thank you
            </SectionHeaderHighlight>{' '}
            for scheduling a return pickup with us!
          </div>
        </Reveal>
        <Reveal>
          <SectionDescription className="text-left md:text-xl md:font-normal">
            {returnProcess.currentData.contact_full_name} , your pickup order{' '}
            <SectionHeaderHighlight>#{order.orderRef}</SectionHeaderHighlight>{' '}
            is confirmed.
          </SectionDescription>
        </Reveal>
        <Reveal>
          <SectionDescription className="text-left md:text-xl md:font-normal">
            A confirmation email will be sent to:{' '}
            <SectionHeaderHighlight>
              {returnProcess.currentData.userInfo.email}
            </SectionHeaderHighlight>
          </SectionDescription>
        </Reveal>
      </ReturnProcessSection>

      <div className="mb-8 mt-0 flex w-full flex-col justify-between text-base text-brand sm:w-5/6 sm:gap-x-4 sm:text-smallText md:flex-row lg:mt-0">
        <Reveal>
          <section className="h-fit rounded-3xl border-2 border-primary bg-white p-4 sm:p-8">
            <Reveal>
              <p className="mb-2 sm:mb-4">
                <span className="font-bold">Location:</span>{' '}
                {(() => {
                  const deliveryAddress = returnProcess.currentData.unit_number
                    ? `${returnProcess.currentData.unit_number}-${returnProcess.currentData.street}, ${returnProcess.currentData.city}, ${returnProcess.currentData.province}, ${returnProcess.currentData.country} ${returnProcess.currentData.postal_code}`
                    : `${returnProcess.currentData.street}, ${returnProcess.currentData.city}, ${returnProcess.currentData.province}, ${returnProcess.currentData.country} ${returnProcess.currentData.postal_code}`

                  return deliveryAddress
                })()}
              </p>
            </Reveal>
            <Reveal>
              <p className="mb-2 sm:mb-4">
                <span className="font-bold">Pickup Date:</span>{' '}
                {returnProcess.currentData.dateAndTime}
              </p>
            </Reveal>
            <Reveal>
              <p className="mb-2 sm:mb-4">
                <span className="font-bold">Pickup Method:</span>{' '}
                {returnProcess.currentData.deliveryOption}
              </p>
            </Reveal>
            <Reveal>
              <p className="mb-2 sm:mb-4">
                <span className="font-bold">Total Packages:</span>{' '}
                {returnProcess.currentData.labelFileUploads.length}
              </p>
            </Reveal>
            <Reveal>
              <p className="mb-0">
                <span className="font-bold">Payment Method:</span>{' '}
                {order.cardType} ending in {order.cardNumber}
              </p>
            </Reveal>
          </section>
        </Reveal>
        <section className="flex flex-col items-center justify-end">
          <Reveal>
            <div className="scale-90 sm:scale-100">
              <FastTruck />
            </div>
          </Reveal>
          <div>
            <Link href="/dashboard">
              <Reveal>
                <Button className="mt-0 whitespace-nowrap px-8 text-base tracking-wider sm:mt-8">
                  Return to Dashboard
                </Button>
              </Reveal>
            </Link>
          </div>
        </section>
      </div>
    </ReturnProcessRoot>
  )
}
