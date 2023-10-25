import React from 'react'
import CardItem from '@components/DemoCards/CardItem.tsx/CardItem'
import CalendarSvg from '@/components/SvgComponents/CalendarSvg'
import PackageDeliverySvg from '@/components/SvgComponents/PackageDeliverySvg'
import VanSvg from '@/components/SvgComponents/VanSvg'
import NounBarcodeSvg from '@/components/SvgComponents/NounBarcodeSvg'
import TimerSvg from '@/components/SvgComponents/TimerSvg'
import NounPinSvg from '@/components/SvgComponents/NounPinSvg'
import { AiFillCheckCircle } from 'react-icons/ai'

const cardData = [
  {
    id: 1,
    step: 1,
    icon: CalendarSvg,
    title: 'Schedule A Return',
    description: 'Step-by-step guide to entering pickup details',
  },
  {
    id: 2,
    step: 2,
    icon: PackageDeliverySvg,
    title: 'Select Pickup Method',
    description:
      'Leave your package on your doorsteps or hand it off to our specialist.',
  },

  {
    id: 3,
    step: 3,
    icon: VanSvg,
    title: "We're On Our ",
    description: "Way We'll email you the tracking number once it ships!",
  },
]

const cardData2 = [
  {
    id: 4,
    step: AiFillCheckCircle,
    icon: NounBarcodeSvg,
    description: 'Let us handle the repackaging and label printing for you',
  },
  {
    id: 5,
    step: AiFillCheckCircle,
    icon: TimerSvg,
    description:
      'No more waiting in long lines or dealing with confusing return process',
  },

  {
    id: 6,
    step: AiFillCheckCircle,
    icon: NounPinSvg,
    description: 'Convenient pickup service from wherever you are',
  },
]

function DemoCards() {
  return (
    <div className="absolute top-64 w-full space-y-12 py-2.5 text-center leading-4 text-white md:top-56">
      <section className="px-20">
        <div className="mx-auto mt-20 flex max-w-7xl justify-between gap-6 md:mt-10 lg:mt-8">
          <title className="mb-4 block max-w-5xl text-left text-mediumText md:text-largeText lg:text-5xl xl:text-subtitle">
            How It Works
          </title>
        </div>
        <div className=" mx-auto flex max-w-7xl flex-col items-center gap-6 md:flex-row md:justify-between">
          {cardData.map((data) => (
            <CardItem
              step={data.step}
              key={data.step}
              icon={data.icon()}
              description={data.description}
              title={data.title}
            />
          ))}
        </div>
      </section>
      <section className="px-20">
        <div className=" mx-auto flex max-w-7xl justify-between gap-6">
          <title className="mb-4 block max-w-5xl text-left text-mediumText md:text-largeText lg:text-5xl xl:text-subtitle">
            Your Benefits
          </title>
        </div>
        <div className=" mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row md:justify-between">
          {cardData2.map((data) => (
            <CardItem
              step={data.step}
              key={data.id}
              icon={data.icon()}
              description={data.description}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default DemoCards
