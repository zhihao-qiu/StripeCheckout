/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from './button'
import NextArrow from '../SvgComponents/NextArrow'
import BackArrow from '../SvgComponents/BackArrow'

const ReturnProcessNextButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <Button
    ref={ref}
    variant={'default'}
    className={cn('text-md w-28 space-x-2', className)}
    asChild
    {...props}
  >
    <div>
      <p>Next</p> <NextArrow />
    </div>
    
  </Button>
))
ReturnProcessNextButton.displayName = 'ReturnProcessNextButton'

const ReturnProcessBackButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <Button
    ref={ref}
    variant={'link'}
    className={cn(className, 'font-semibold text-primary decoration-primary hover:underline text-md space-x-2')}
    {...props}
  >
    <BackArrow /> <p>Back</p> 
  </Button>
))
ReturnProcessBackButton.displayName = 'ReturnProcessBackButton'

export { ReturnProcessNextButton, ReturnProcessBackButton }
