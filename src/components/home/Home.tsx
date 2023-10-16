/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils'
import React from 'react'

const HomeSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col items-center justify-center space-y-10',
      className
    )}
    {...props}
  />
))
HomeSection.displayName = 'HomeSection'

const HomeSectionTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-4xl font-bold lg:text-5xl', className)}
    {...props}
  />
))
HomeSectionTitle.displayName = 'HomeSectionTitle'

const HomeSectionTitleHighlight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('text-4xl font-bold text-primary lg:text-5xl', className)}
    {...props}
  />
))
HomeSectionTitleHighlight.displayName = 'HomeSectionTitleHighlight'

const HomeSectionDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <article
    ref={ref}
    className={cn(
      'shrink text-center text-base font-semibold text-brand sm:text-lg',
      className
    )} //  md:w-4/5
    {...props}
  />
))
HomeSectionDescription.displayName = 'HomeSectionDescription'

export {
  HomeSection,
  HomeSectionTitle,
  HomeSectionTitleHighlight,
  HomeSectionDescription,
}
