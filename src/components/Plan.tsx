import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Check } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import Stamp from '@components/SvgComponents/Stamp'
import { type PlanDataType } from './ChoosePlan'
import React from 'react'
import { cn } from '@lib/utils'

type PlanProps = {
  plan: PlanDataType
}

export const planTextClassName = (plan: string) => {
  return cn(
    'bg-gradient-to-b bg-clip-text text-2xl font-extrabold tracking-wider text-transparent',
    plan === 'Bronze' && 'from-orange-400 via-amber-600 to-lime-900',
    plan === 'Silver' && 'from-gray-200 via-gray-400 to-gray-600',
    plan === 'Gold' && ' from-yellow-200 via-yellow-400 to-yellow-600',
    plan === 'Platinum' && 'from-slate-200 via-slate-400 to-slate-600'
  )
}

const Plan = React.forwardRef<HTMLDivElement, PlanProps>(
  ({ plan, ...props }, ref) => {
    return (
      <Card
        {...props}
        ref={ref}
        className="min-w-72 flex h-[450px] w-[275px] scale-90 flex-col items-center justify-start rounded-2xl border-2 border-brand bg-white text-brand data-[state=on]:border-[6px] data-[state=on]:border-primary data-[state=off]:opacity-50 data-[state=on]:shadow-xl sm:scale-100"
      >
        <CardHeader className="pb-3">
          {plan.name !== 'Platinum' ? (
            <CardTitle className={planTextClassName(plan.name)}>
              {plan.name}
            </CardTitle>
          ) : null}

          {plan.name === 'Platinum' && (
            <CardTitle className="relative bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 bg-clip-text text-2xl font-extrabold tracking-wider text-transparent">
              {plan.name}
              <div className="absolute -right-16 -top-4">
                <Stamp />
              </div>
            </CardTitle>
          )}
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-start text-base font-light">
          <p className="text-4xl font-bold">
            ${(Number(plan.price) / 100).toFixed(2)}
          </p>
          <p>{plan.period}</p>
          <p>{plan.total}</p>
        </CardContent>

        <Separator className="w-4/5 bg-brand" />

        <CardContent className="mt-8 flex h-[200px] w-4/5 flex-col justify-items-start gap-y-2 p-0 text-sm font-medium">
          <p className="flex w-full gap-x-2">
            <span>
              <Check className="w-5 text-primary" />
            </span>
            <span>{plan.duration}</span>
          </p>
          <p className="flex w-full gap-x-2">
            <span>
              <Check className="w-5 text-primary" />
            </span>
            <span>{plan.speed}</span>
          </p>
          <p className="flex w-full gap-x-2">
            <span>
              <Check className="w-5 text-primary" />
            </span>
            <span>{plan.support}</span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-start">
          {/* <RadioGroupItem
          className="mb-2 h-10 w-10 border-2 border-brand p-0 text-primary focus:border-primary"
          value={plan.name}
          id={plan.name}
          checked={status === 'selected'}
        /> */}
          <Label
            htmlFor={plan.name}
            className="text-base font-normal text-primary"
          >
            Select
          </Label>
        </CardFooter>
      </Card>
    )
  }
)
Plan.displayName = 'Plan'

export default Plan
