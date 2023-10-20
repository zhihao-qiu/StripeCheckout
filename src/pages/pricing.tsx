import ChoosePlan from '@/components/ChoosePlan'
import { getLayout } from '@/layouts/ReturnProcessLayout'

export default function Pricing() {
  return (
    <div className="h-screen w-screen max-w-4xl">
      <ChoosePlan />
    </div>
  )
}

Pricing.getLayout = getLayout
