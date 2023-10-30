/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useReturnProcess } from '@/hooks/useReturnProcess'
import { Button, type ButtonProps } from '@components/ui/button'
import NextArrow from '@components/SvgComponents/NextArrow'
import BackArrow from '@components/SvgComponents/BackArrow'

const ReturnProcessRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('container space-y-14 bg-paleBlue pt-16', className)}
    {...props}
  />
))
ReturnProcessRoot.displayName = 'ReturnProcessRoot'

const ReturnProcessSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col items-start justify-center space-y-3 text-brand',
      className
    )}
    {...props}
  />
))
ReturnProcessSection.displayName = 'ReturnProcessSection'

const ReturnProcessNextButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, disabled, ...props }, ref) => {
  const methods = useFormContext()
  return (
    <Button
      ref={ref}
      disabled={!methods.formState.isValid || disabled}
      variant={'default'}
      type={'submit'}
      className={cn('text-md w-28 select-none space-x-2', className)}
      {...props}
    >
      <div className="flex items-center justify-center space-x-2">
        <p>Next</p> <NextArrow />
      </div>
    </Button>
  )
})
ReturnProcessNextButton.displayName = 'ReturnProcessNextButton'

const ReturnProcessBackButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const returnProcess = useReturnProcess()
  return (
    <Button
      ref={ref}
      variant={'link'}
      onClick={() => returnProcess.back()}
      className={cn(
        className,
        'text-md select-none space-x-2 font-semibold text-primary decoration-primary hover:underline'
      )}
      {...props}
    >
      <BackArrow /> <p>Back</p>
    </Button>
  )
})
ReturnProcessBackButton.displayName = 'ReturnProcessBackButton'

export {
  ReturnProcessRoot,
  ReturnProcessSection,
  ReturnProcessNextButton,
  ReturnProcessBackButton,
}
