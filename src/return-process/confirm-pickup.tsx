import OrderSummary from '@/components/ConfirmPickup/OrderSummary'
import Calendar from '@/components/SvgComponents/ConfirmPickup/Calendar'
import CreditCard from '@/components/SvgComponents/ConfirmPickup/CreditCard'
import EditContainer from '@/components/SvgComponents/ConfirmPickup/EditContainer'
import Location from '@/components/SvgComponents/ConfirmPickup/Location'
import Package from '@/components/SvgComponents/ConfirmPickup/Package'
import PickupTrolley from '@/components/SvgComponents/ConfirmPickup/PickupTrolley'
import ScrollContainer from '@/components/SvgComponents/ConfirmPickup/ScrollContainer'
import { ReturnProcessBackButton } from '@/components/common/return-process'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Reveal from '@components/common/reveal'

export interface MockData {
  plan: 'bronze' | 'silver' | 'gold' | 'platinum'
  extraBoxes?: number
  bronzePrice: number
  extraBoxPrice: number
}

const mockData: MockData = {
  plan: 'bronze',
  extraBoxes: 1,
  bronzePrice: 1099,
  extraBoxPrice: 399,
}

interface Order {
  name: string
  tel: string
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
  name: 'John Doe',
  tel: '(123) 456-7891',
  orderRef: 'R957394',
  email: 'johndoe2394@gmail.com',
  location: '6500 Boulevard de Rome, Brossard, QC J4Y 0B6',
  pickupDate: 'Mon, Sep 25th',
  pickupMethod: 'Direct Handoff',
  totalPackages: 1,
  cardType: 'Visa',
  cardNumber: 4832,
}

export default function ConfirmPickup() {
  // If the user enters a Promo Code in the Order Summary, it will be held in state here
  const [promoCode, setPromoCode] = useState('')

  // Logic for the Scroll-to-Bottom button
  const [showScrollBtn, setShowScrollBtn] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setShowScrollBtn(true)
      } else {
        setShowScrollBtn(false)
      }
    }
    window.addEventListener('scroll', handleScroll, true)
    return window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollDown: () => void = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div className="mt-6 flex w-full flex-col items-center sm:mt-10 md:flex-row md:items-start md:justify-around md:tracking-wide">
      <section className="mx-1 flex w-full flex-col items-center text-base sm:mb-10 sm:w-2/3 sm:text-smallText">
        <div className="flex w-11/12 flex-col md:w-3/4">
          <section className="mb-4 sm:mb-10">
            <Reveal>
              <h1 className="md-1 w-full text-mediumText sm:mb-2 sm:text-subtitle">
                Confirm Pickup
              </h1>
            </Reveal>
            <Reveal>
              <p className="text-grey md:tracking-wide">
                Make sure all the details look good!
              </p>
            </Reveal>
          </section>

          <section className="sm:mb-10">
            <Reveal>
              <h2 className="text-smallText font-semibold text-primary sm:mb-6 sm:text-2xl">
                Pickup Information
              </h2>
            </Reveal>
            <div className="flex w-full justify-between gap-2 md:gap-10">
              <div className="flex min-w-[35px] justify-center md:min-w-[70px]">
                <div className="h-[28px] w-[21px] pt-3 sm:h-[56px] sm:w-[42px] sm:pt-0">
                  <Reveal>
                    <Location />
                  </Reveal>
                </div>
              </div>
              <div className="w-full space-y-3">
                <Reveal>
                  <p className="font-bold">
                    {mockOrder.name}
                    <span className="text-mediumText font-normal">
                      &nbsp;|&nbsp;
                    </span>
                    {mockOrder.tel}
                  </p>
                </Reveal>
                <Reveal>
                  <p>{mockOrder.location}</p>
                </Reveal>
                {mockOrder.pickupMethod === 'Direct Handoff' && (
                  <Reveal>
                    <p className="text-grey md:tracking-wide">
                      Please ring the doorbell when picking up
                    </p>
                  </Reveal>
                )}
              </div>
              <EditContainer />
            </div>
            <Reveal width="100%">
              <Separator className="mb-4 mt-4 w-full bg-brand" />
            </Reveal>
            <div className="flex w-full justify-between gap-2 md:gap-10">
              <div className="flex min-w-[35px] justify-center md:min-w-[70px]">
                <div className="h-[39px] w-[31px] sm:h-[79px] sm:w-[63px]">
                  <Reveal>
                    <Calendar />
                  </Reveal>
                </div>
              </div>
              <Reveal width="100%">
                <p className="grow sm:mt-4">
                  <span className="font-bold">Pickup Date:</span>
                  <span>&nbsp;{mockOrder.pickupDate}</span>
                </p>
              </Reveal>
              <EditContainer />
            </div>
            <Reveal width="100%">
              <Separator className="mb-4 mt-4 w-full bg-brand" />
            </Reveal>
            <div className="flex w-full justify-between gap-2 md:gap-10">
              <div className="flex min-w-[35px] justify-center md:min-w-[70px]">
                <div className="h-[34px] w-[30px] sm:h-[68px] sm:w-[60px]">
                  <Reveal>
                    <PickupTrolley />
                  </Reveal>
                </div>
              </div>
              <Reveal width="100%">
                <p className="grow sm:mt-4">
                  <span className="font-bold">Pickup Method:</span>
                  <span>&nbsp;{mockOrder.pickupMethod}</span>
                </p>
              </Reveal>
              <EditContainer />
            </div>
            <Reveal width="100%">
              <Separator className="mb-4 mt-4 w-full bg-brand" />
            </Reveal>
          </section>

          <section>
            <Reveal>
              <h2 className="mb-2 text-smallText font-semibold text-primary sm:mb-6 sm:text-2xl">
                Package Summary
              </h2>
            </Reveal>
            <div className="flex w-full justify-between gap-2 md:gap-10">
              <div className="flex min-w-[35px] justify-center md:min-w-[70px]">
                <div className="h-[21px] w-[27px] sm:h-[46px] sm:w-[60px]">
                  <Reveal>
                    <Package />
                  </Reveal>
                </div>
              </div>
              <div className="grow">
                <Reveal width="100%">
                  <p>
                    <span className="font-bold">Total Packages:&nbsp;</span>
                    <span>
                      {mockData.extraBoxes ? mockData.extraBoxes + 1 : 1}
                    </span>
                  </p>
                </Reveal>
                <Link href="/" className="w-2/3 text-primary">
                  <Reveal width="100%">
                    <div className="flex items-center justify-start">
                      <div className="text-normal sm:text-subtitle">+</div>
                      <div className="mt-1">&nbsp;Add a package</div>
                    </div>
                  </Reveal>
                </Link>
              </div>
              <EditContainer />
            </div>
            <Reveal width="100%">
              <Separator className="mb-4 mt-4 w-full bg-brand" />
            </Reveal>
          </section>

          <section>
            <Reveal>
              <h2 className="text-smallText font-semibold text-primary sm:mb-2 sm:text-2xl">
                Payment Method
              </h2>
            </Reveal>
            <div className="flex w-full justify-between gap-2 md:gap-10">
              <div className="flex min-w-[35px] justify-center md:min-w-[70px]">
                <div className="h-[35px] w-[35px] sm:h-[70px] sm:w-[70px]">
                  <Reveal>
                    <CreditCard />
                  </Reveal>
                </div>
              </div>
              <div className="mt-1 grow sm:mt-3">
                <Reveal width="100%">
                  <p>
                    <span className="font-bold">
                      {mockOrder.cardType} ending in:&nbsp;
                    </span>
                    <span>{mockOrder.cardNumber} </span>
                  </p>
                </Reveal>
              </div>
              <EditContainer />
            </div>
          </section>
          <div className="my-2 flex sm:my-10">
            <Reveal>
              <ReturnProcessBackButton />
            </Reveal>
          </div>
        </div>
      </section>
      {mockData.plan === 'bronze' && (
        <OrderSummary
          promoState={[promoCode, setPromoCode]}
          orderData={mockData}
        />
      )}
      {showScrollBtn && <ScrollContainer scrollDown={scrollDown} />}
    </div>
  )
}
