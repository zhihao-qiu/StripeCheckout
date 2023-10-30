/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils'
import React from 'react'
import ReturnPalTitle from '@components/SvgComponents/ReturnPalTitle'
import Logo from '@components/SvgComponents/Logo'
import { type IconType } from '@components/SvgComponents/types'

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

const HeaderLogoRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center space-x-2', className)}
    {...props}
  />
))
HeaderLogoRoot.displayName = 'HeaderLogoRoot'

const HeaderLogoTitle = ({ className, ...props }: IconType) => (
  <ReturnPalTitle
    className={cn('hidden h-10 w-40 fill-white lg:flex', className)}
    {...props}
  />
)
HeaderLogoTitle.displayName = 'HeaderLogoTitle'

const HeaderLogoImage = ({ className, ...props }: IconType) => (
  <Logo
    className={cn('hidden h-7 w-7 shrink-0 fill-primary sm:flex', className)}
    {...props}
  />
)
HeaderLogoImage.displayName = 'HeaderLogoImage'

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

export {
  HeaderRoot,
  HeaderSub,
  HeaderLogoRoot,
  HeaderLogoTitle,
  HeaderLogoImage,
  HeaderContent,
}
