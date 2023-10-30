import OrderSummary from '@/components/ConfirmPickup/OrderSummary'
import Calendar from '@/components/SvgComponents/ConfirmPickup/Calendar'
import CreditCard from '@/components/SvgComponents/ConfirmPickup/CreditCard'
import Edit from '@/components/SvgComponents/ConfirmPickup/Edit'
import Location from '@/components/SvgComponents/ConfirmPickup/Location'
import Package from '@/components/SvgComponents/ConfirmPickup/Package'
import PickupTrolley from '@/components/SvgComponents/ConfirmPickup/PickupTrolley'
import ScrollDownChevron from '@/components/SvgComponents/ConfirmPickup/ScrollDownChevron'
import { ReturnProcessBackButton } from '@/components/ui/common'
import { Separator } from '@/components/ui/separator'
import { getLayout } from '@/layouts/ReturnProcessLayout'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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
  const [promoCode, setPromoCode] = useState('')
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

  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div className="mt-6 flex w-full flex-col items-center sm:mt-10 sm:flex-row sm:items-start sm:justify-around md:tracking-wide">
      <section className="mx-1 flex flex-col items-center text-base sm:mb-10 sm:w-2/3 sm:text-smallText">
        <div className="flex w-3/4 flex-col">
          <section className="sm:mb-10">
            <h1 className="mb-2 w-full text-smallText sm:text-subtitle">
              Confirm Pickup
            </h1>
            <p className="text-grey md:tracking-wide">
              Make sure all the details look good!
            </p>
          </section>

          <section className="sm:mb-10">
            <h2 className="text-smallText font-semibold text-primary sm:mb-6 sm:text-2xl">
              Pickup Information
            </h2>
            <div className="flex w-full justify-between gap-10">
              <div className="flex w-[70px] grow-0 justify-center">
                <div className="h-[56px] w-[42px] grow-0">
                  <Location />
                </div>
              </div>
              <div className="grow space-y-3">
                <p className="font-bold">
                  {mockOrder.name}
                  <span className="text-mediumText font-normal">
                    &nbsp;|&nbsp;
                  </span>
                  {mockOrder.tel}
                </p>
                <p>{mockOrder.location}</p>
                {mockOrder.pickupMethod === 'Direct Handoff' && (
                  <p className="text-grey md:tracking-wide">
                    Please ring the doorbell when picking up
                  </p>
                )}
              </div>
              <div className="mt-4 h-[28px] w-[28px] grow-0">
                <Edit />
              </div>
            </div>

            <Separator className="mb-4 mt-4 w-full bg-brand" />

            <div className="flex w-full justify-between gap-10">
              <div className="flex w-[70px] grow-0 justify-center">
                <div className="h-[79px] w-[63px] grow-0">
                  <Calendar />
                </div>
              </div>
              <p className="mt-4 grow">
                <span className="font-bold">Pickup Date:</span>
                <span>&nbsp;{mockOrder.pickupDate}</span>
              </p>
              <div className="mt-4 h-[28px] w-[28px] grow-0">
                <Edit />
              </div>
            </div>

            <Separator className="mb-4 mt-4 w-full bg-brand" />

            <div className="flex w-full justify-between gap-10">
              <div className="flex w-[70px] grow-0 justify-center">
                <div className="h-[68px] w-[60px] grow-0">
                  <PickupTrolley />
                </div>
              </div>
              <p className="mt-4 grow">
                <span className="font-bold">Pickup Method:</span>
                <span>&nbsp;{mockOrder.pickupMethod}</span>
              </p>
              <div className="mt-4 h-[28px] w-[28px] grow-0">
                <Edit />
              </div>
            </div>
            <Separator className="mb-4 mt-4 w-full bg-brand" />
          </section>

          <section>
            <h2 className="text-smallText font-semibold text-primary sm:mb-6 sm:text-2xl">
              Package Summary
            </h2>
            <div className="flex w-full justify-between gap-10">
              <div className="flex w-[70px] grow-0 justify-center">
                <div className="h-[46px] w-[60px] grow-0">
                  <Package />
                </div>
              </div>
              <div className="grow space-y-3">
                <p>
                  <span className="font-bold">Total Packages:&nbsp;</span>
                  <span>
                    {mockData.extraBoxes ? mockData.extraBoxes + 1 : 1}
                  </span>
                </p>
                <Link href="/" className="w-8/12 text-primary">
                  <div className="flex items-center justify-start">
                    <div className="text-subtitle">+</div>
                    <div className="mt-1">&nbsp;Add a package</div>
                  </div>
                </Link>
              </div>
              <div className="mt-4 h-[28px] w-[28px] grow-0">
                <Edit />
              </div>
            </div>
            <Separator className="mb-4 mt-4 w-full bg-brand" />
          </section>

          <section>
            <h2 className="text-smallText font-semibold text-primary sm:mb-6 sm:text-2xl">
              Payment Method
            </h2>
            <div className="flex w-full justify-between gap-10">
              <div className="flex w-[70px] grow-0 justify-center">
                <div className="h-[70px] w-[70px] grow-0">
                  <CreditCard />
                </div>
              </div>
              <div className="grow space-y-3">
                <p>
                  <span className="font-bold">
                    {mockOrder.cardType} ending in:&nbsp;
                  </span>
                  <span>{mockOrder.cardNumber} </span>
                </p>
              </div>
              <div className="mt-4 h-[28px] w-[28px] grow-0">
                <Edit />
              </div>
            </div>
          </section>
          <div className="my-10 flex">
            <ReturnProcessBackButton />
          </div>
        </div>
      </section>
      {mockData.plan === 'bronze' && (
        <OrderSummary
          promoState={[promoCode, setPromoCode]}
          orderData={mockData}
        />
      )}
      {/* scroll to bottom arrow and text */}
      {showScrollBtn && (
        <div
          className="fixed left-[50%] top-[91%] z-10 flex translate-x-[-50%] translate-y-[-50%] flex-col items-center hover:scale-105 hover:cursor-pointer"
          onClick={scrollDown}
        >
          <div className="h-10 w-12 text-primary hover:text-gradientL">
            <ScrollDownChevron />
          </div>
          <div className="text-xs">scroll</div>
        </div>
      )}
    </div>
  )
}

ConfirmPickup.getLayout = getLayout
