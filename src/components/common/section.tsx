/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils'
import React from 'react'

const Section = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col items-center justify-center space-y-10 text-brand',
      className
    )}
    {...props}
  />
))
Section.displayName = 'Section'

const SectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-4xl font-bold lg:text-5xl', className)}
    {...props}
  />
))
SectionHeader.displayName = 'SectionHeader'

const SectionHeaderHighlight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('font-bold text-primary', className)}
    {...props}
  />
))
SectionHeaderHighlight.displayName = 'SectionHeaderHighlight'

const SectionDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'shrink text-center text-base font-semibold text-brand sm:text-lg',
      className
    )} //  md:w-4/5
    {...props}
  />
))
SectionDescription.displayName = 'SectionDescription'

const SectionBackground = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('m-[calc(-50vw+50%)]', className)} {...props} />
))
SectionBackground.displayName = 'SectionBackground'

const SectionBackgroundContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('relative', className)} {...props} />
))
SectionBackgroundContent.displayName = 'SectionBackgroundContent'

const SectionBackgroundAbsolute = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('absolute top-28 w-full', className)}
    {...props}
  />
))
SectionBackgroundAbsolute.displayName = 'SectionBackgroundAbsolute'

export {
  Section,
  SectionHeader,
  SectionHeaderHighlight,
  SectionDescription,
  SectionBackground,
  SectionBackgroundContent,
  SectionBackgroundAbsolute,
}
