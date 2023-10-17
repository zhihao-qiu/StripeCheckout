import { useState } from 'react'
import Plan from './Plan'
import { RadioGroup } from '@/components/ui/radio-group'
import { Button } from './ui/button'

const planData = [
  {
    name: 'Bronze',
    price: 1099,
    period: '+$3.99 per additional box',
    total: '(One-time pickup)',
    duration: 'One-time pickup',
    speed: 'Repackaging and labeling',
    support: 'Email and phone support',
  },
  {
    name: 'Silver',
    price: 2099,
    period: 'per month',
    total: '$20.99 billed monthly',
    duration: 'Unlimited pickups during the month',
    speed: 'Repackaging and labeling',
    support: 'Email and phone support',
  },
  {
    name: 'Gold',
    price: 1899,
    period: 'per month',
    total: '$56.97 billed quarterly',
    duration: 'Unlimited pickups for 3 months',
    speed: 'Expedited repackaging and labeling service',
    support: 'Email and phone support',
  },
  {
    name: 'Platinum',
    price: 1479,
    period: 'per month',
    total: '$177.48 billed yearly',
    duration: 'Unlimited pickups for 1 year',
    speed: 'Expedited repackaging and labeling service',
    support: 'Email and phone support',
  },
]

export default function ChoosePlan() {
  const [selectedPlanName, setSelectedPlanName] = useState('')

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-start bg-paleBlue p-10">
      <RadioGroup className="flex w-full flex-wrap justify-center gap-8">
        {planData.map(plan => {
          const status = !selectedPlanName
            ? 'normal'
            : selectedPlanName === plan.name
            ? 'selected'
            : 'unselected'
          return (
            <Plan
              key={plan.name}
              plan={plan}
              status={status}
              setSelectedPlanName={setSelectedPlanName}
            />
          )
        })}
      </RadioGroup>
      <div className="mt-8 flex w-10/12 justify-between">
        <button
          type="button"
          className="flex items-center bg-transparent text-base font-semibold text-primary sm:bottom-[80px] sm:left-[10%] sm:text-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span>&nbsp;Back</span>
        </button>
        <Button
          type="button"
          className="h-10 w-[100px] rounded-3xl text-lg sm:h-10 sm:w-[125px]"
        >
          Next&nbsp;&nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-3 w-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Button>
      </div>
    </div>
  )
}
