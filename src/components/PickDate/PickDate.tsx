/* eslint-disable react/prop-types */
import { cn, getDayName } from '@/lib/utils'
import { Card, CardContent } from '../ui/card'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { type VariantProps, cva } from 'class-variance-authority'

type PickCardType = React.HTMLAttributes<HTMLDivElement> & {
  date: Date
}

const PickDateCard = React.forwardRef<HTMLDivElement, PickCardType>(
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
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */}
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

export type ButtonProps = {
  size: 'default' | 'small'
} & React.HTMLAttributes<HTMLDivElement>

const NextWeekButton = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ className, size = 'default', onClick }, ref) => {
    return (
      <div
        className={cn(
          'flex select-none flex-col items-center justify-center space-y-4 text-center font-semibold text-brand hover:cursor-pointer hover:text-primary',
          className
        )}
        onClick={onClick}
        ref={ref}
      >
        <FontAwesomeIcon
          size="2x"
          className={cn(
            size === 'default' && 'h-16 w-16',
            size === 'small' && 'h-8 w-8'
          )}
          icon={faChevronRight}
        />
        <p className="text-2xl">Next Week</p>
      </div>
    )
  }
)
NextWeekButton.displayName = 'NextWeekButton'

const LastWeekButton = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ className, size = 'default', onClick }, ref) => {
    return (
      <div
        onClick={onClick}
        className={cn(
          'flex select-none flex-col items-center justify-center space-y-4 text-center font-semibold text-brand hover:cursor-pointer hover:text-primary',
          className
        )}
        ref={ref}
      >
        <FontAwesomeIcon
          size="2x"
          className={cn(
            size === 'default' && 'h-16 w-16',
            size === 'small' && 'h-8 w-8'
          )}
          icon={faChevronLeft}
        />
        <p className="text-2xl">Last Week</p>
      </div>
    )
  }
)
LastWeekButton.displayName = 'LastWeekButton'

export { PickDateCard, NextWeekButton, LastWeekButton }
