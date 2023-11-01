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
    'bg-gradient-to-b bg-clip-text text-base sm:text-2xl font-extrabold tracking-wider text-transparent',
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
        className="min-w-72 flex h-[280px] w-[160px] flex-col items-center justify-start rounded-2xl border-2 border-brand bg-white text-brand data-[state=on]:border-[6px] data-[state=on]:border-primary data-[state=off]:opacity-50 data-[state=on]:shadow-xl sm:h-[450px] sm:w-[275px]"
      >
        <CardHeader className="mt-2 p-0 sm:mt-6 sm:pb-3">
          {plan.name !== 'Platinum' ? (
            <CardTitle className={planTextClassName(plan.name)}>
              {plan.name}
            </CardTitle>
          ) : null}

          {plan.name === 'Platinum' && (
            <CardTitle className="relative bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 bg-clip-text text-base font-extrabold tracking-wider text-transparent sm:text-2xl">
              {plan.name}
              <div className="absolute -right-8 -top-1 h-[30px] w-[30px] sm:-right-16 sm:-top-5 sm:h-[60px] sm:w-[60px]">
                <Stamp />
              </div>
            </CardTitle>
          )}
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-start pb-0 text-center text-xs font-light sm:pb-6 sm:text-base">
          <p className="text-base font-bold sm:text-4xl">
            ${(Number(plan.price) / 100).toFixed(2)}
          </p>
          <p>{plan.period}</p>
          <p>{plan.total}</p>
        </CardContent>

        <Separator className="w-4/5 bg-brand" />

        <CardContent className="mt-2 flex h-[200px] w-4/5 flex-col justify-items-start gap-y-2 p-0 text-xs font-medium sm:mt-8 sm:text-sm">
          <p className="flex w-full gap-x-1 sm:gap-x-2">
            <span>
              <Check className="w-3 text-primary sm:w-5" />
            </span>
            <span>{plan.duration}</span>
          </p>
          <p className="flex w-full gap-x-2">
            <span>
              <Check className="w-3 text-primary sm:w-5" />
            </span>
            <span>{plan.speed}</span>
          </p>
          <p className="flex w-full gap-x-2">
            <span>
              <Check className="w-3 text-primary sm:w-5" />
            </span>
            <span>{plan.support}</span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-start pb-2 sm:pb-8">
          <Label
            htmlFor={plan.name}
            className="text-xs font-normal text-primary sm:text-base"
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
