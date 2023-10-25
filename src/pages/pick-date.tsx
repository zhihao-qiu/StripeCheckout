import {
  HomeSection,
  SectionDescription,
  SectionHeader,
  SectionHeaderHighlight,
} from '@/components/home/Home'
import { Card, CardContent } from '@/components/ui/card'
import { cn, getDayName } from '@/lib/utils'
import {
  faChevronLeft,
  faChevronRight,
  faClose,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { getLayout } from '@/layouts/ReturnProcessLayout'
import Head from 'next/head'
import { ReturnProcessNextButton } from '@/components/ui/common'
import { useDateSelection } from '@/hooks/useDateSelection'

type PickCardType = React.HTMLAttributes<HTMLDivElement> & {
  date: Date
}
// TODO: Selecting a card moves all the other cards down, make sure only the selected card grows and the other ones don't move

const PickDateCard = React.forwardRef<HTMLDivElement, PickCardType>(
  // eslint-disable-next-line react/prop-types
  ({ date, className, ...props }, ref) => {
    return (
      <Card
        className={cn(
          'w-[9.5rem] select-none border-brand bg-paleBlue text-brand hover:cursor-pointer data-[state=on]:scale-110 data-[state=on]:border-8 data-[state=on]:border-primary data-[state=on]:bg-white data-[state=on]:shadow-2xl',
          className
        )}
        ref={ref}
        {...props}
      >
        <CardContent className="flex flex-col items-center space-y-4 pt-6">
          <p className="text-2xl font-semibold">
            {getDayName(date.getDay())?.substring(0, 3)}
          </p>
          <p className="text-5xl font-bold">{date.getDate()}</p>
          <p className="flex text-lg font-semibold">
            {date.toLocaleString('en-us', { month: 'short', year: 'numeric' })}
          </p>
        </CardContent>
      </Card>
    )
  }
)
PickDateCard.displayName = 'PickDateCard'

export default function PickDate() {
  const dateSelection = useDateSelection(new Date())

  // TODO: These functions are temporary until we move these into Back/Forward button components
  function nextWeek() {
    dateSelection.forward()
  }

  function lastWeek() {
    dateSelection.back()
  }

  return (
    <>
      <Head>
        <title>Pick Date</title>
      </Head>

      <div className="container space-y-20 bg-paleBlue pt-16">
        <HomeSection className="items-start space-y-3">
          <SectionHeader className="flex w-full justify-between font-semibold">
            <div>
              Choose a pickup{' '}
              <SectionHeaderHighlight>date</SectionHeaderHighlight>
            </div>
            {/* TODO: This may need to change later depending on what we decide to
            do to exit the return process. Confirmation prompt? */}
            <Link
              href="/"
              className="flex flex-col items-center justify-center text-base text-primary hover:cursor-pointer hover:text-brand"
            >
              <FontAwesomeIcon icon={faClose} width={'35'} height={'35'} />
              <p>Cancel</p>
            </Link>
          </SectionHeader>
          <SectionDescription>
            We&apos;ll text you the morning of your pickup with an estimated
            time arrival.
          </SectionDescription>
        </HomeSection>

        <div className="flex-row justify-center gap-x-4 space-y-11">
          {/* <div className="flex  items-center justify-center space-y-4 text-center font-semibold text-brand"> */}
          <div className="flex justify-center gap-x-11 xl:hidden">
            <div
              // className="flex select-none flex-col items-center justify-center space-y-4 text-center font-semibold text-brand hover:cursor-pointer hover:text-primary"
              className="flex select-none flex-col items-center justify-center space-y-4 text-center font-semibold text-gray-600 hover:cursor-not-allowed"
              onClick={() => lastWeek()}
            >
              <FontAwesomeIcon
                size="2x"
                width={'50'}
                height={'60'}
                icon={faChevronLeft}
              />
              <p className="select-none text-2xl ">Last Week1</p>
            </div>
            <div
              className="flex flex-col items-center justify-center space-y-4 text-center font-semibold text-brand hover:cursor-pointer hover:text-primary"
              onClick={() => nextWeek()}
            >
              <FontAwesomeIcon
                size="2x"
                width={'50'}
                height={'60'}
                icon={faChevronRight}
              />
              <p className="text-2xl">Next Week1</p>
            </div>
          </div>

          <div className="flex">
            <div
              className="hidden w-fit select-none flex-col items-center justify-center space-y-4 text-center font-semibold text-brand hover:cursor-pointer hover:text-primary xl:flex"
              onClick={() => lastWeek()}
            >
              <FontAwesomeIcon
                size="2x"
                width={'30'}
                height={'45'}
                icon={faChevronLeft}
              />
              <p className="text-xl">Last Week2</p>
            </div>
            <ToggleGroup.Root
              type="single"
              className="grid w-full grid-cols-1 place-content-center place-items-center content-center items-center justify-center gap-x-7 gap-y-5 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
              onValueChange={(s) => {
                console.log('New value: ', s)
              }}
            >
              {dateSelection.getCurrentDays.map((date) => {
                return (
                  <ToggleGroup.Item
                    key={date.getDate()}
                    value={`${date.getDate()}-${date.getMonth()}`}
                    asChild
                  >
                    <PickDateCard date={date} />
                  </ToggleGroup.Item>
                )
              })}
            </ToggleGroup.Root>
            <div
              className="hidden w-fit flex-col items-center justify-center space-y-4 text-center font-semibold text-brand hover:cursor-pointer hover:text-primary xl:flex"
              onClick={() => nextWeek()}
            >
              <FontAwesomeIcon
                size="2x"
                width={'30'}
                height={'45'}
                icon={faChevronRight}
              />
              <p className="select-none text-xl">Next Week2</p>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row-reverse">
          <Link href="/address">
            <ReturnProcessNextButton />
          </Link>
        </div>
      </div>
    </>
  )
}

PickDate.getLayout = getLayout
