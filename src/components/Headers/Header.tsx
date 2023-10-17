/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils'
import React from 'react'

const HeaderRoot = React.forwardRef<
  HTMLHeadElement,
  React.HTMLAttributes<HTMLHeadElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      'sticky top-0 z-50 flex w-screen border-b border-white bg-white px-9 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]',
      className
    )}
    {...props}
  />
))
HeaderRoot.displayName = 'HeaderRoot'

const HeaderSub = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex h-24 w-full items-center', className)}
    {...props}
  />
))
HeaderSub.displayName = 'HeaderSub'

const HeaderContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex w-full items-center', className)}
    {...props}
  />
))
HeaderContent.displayName = 'HeaderContent'

export { HeaderRoot, HeaderSub, HeaderContent }
