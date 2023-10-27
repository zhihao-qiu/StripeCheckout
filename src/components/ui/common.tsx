/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from './button'
import NextArrow from '../SvgComponents/NextArrow'
import BackArrow from '../SvgComponents/BackArrow'
import { UseFormReturn } from 'react-hook-form'

type ReturnProcessReturnButtonProps =  React.ButtonHTMLAttributes<HTMLButtonElement> & {
  formState?: UseFormReturn['formState']
}

const ReturnProcessNextButton = React.forwardRef<
  HTMLButtonElement,
  ReturnProcessReturnButtonProps
>(({ className, children, type = 'submit', formState, disabled, ...props }, ref) => {
  return (<Button
    ref={ref}
    variant={'default'}
    type={type}
   disabled={disabled || formState && !formState.isValid}
    className={cn('text-md w-28 space-x-2 select-none', className)}
    {...props}
  >
    <div className='flex justify-center items-center space-x-2'>
      <p>Next</p> <NextArrow />
    </div>
  </Button>
  )}
)
ReturnProcessNextButton.displayName = 'ReturnProcessNextButton'

const ReturnProcessBackButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <Button
    ref={ref}
    variant={'link'}
    className={cn(className, 'select-none font-semibold text-primary decoration-primary hover:underline text-md space-x-2')}
    {...props}
  >
    <BackArrow /> <p>Back</p> 
  </Button>
))
ReturnProcessBackButton.displayName = 'ReturnProcessBackButton'

export { ReturnProcessNextButton, ReturnProcessBackButton }
