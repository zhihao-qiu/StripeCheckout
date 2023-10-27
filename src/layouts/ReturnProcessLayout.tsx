import { type PropsWithChildren } from 'react'
import ReturnProcessHeader from '@/components/Headers/ReturnProcess/ReturnProcessHeader'
import ReturnProcessContextProvider, {
  type ReturnProcessStep,
} from '@/context/ReturnProcessContext'
import PickDate from '@/test_pages/pick-date'
import Address from '@/test_pages/address'
import Pickup from '@/test_pages/pickup'
import Pricing from '@/test_pages/pricing'
import PackageInfo from '@/test_pages/package-info'

const steps: ReturnProcessStep[] = [
  {
    id: 'pick-date',
    name: 'Pickup Date',
    component: <PickDate />,
  },
  {
    id: 'address',
    name: 'Addresses',
    component: <Address />,
  },
  {
    id: 'pickup-details',
    name: 'Pickup Details',
    component: <Pickup />,
  },
  {
    id: 'pricing',
    name: 'Pricing',
    component: <Pricing />,
  },
  {
    id: 'package-info',
    name: 'Package Info',
    component: <PackageInfo />,
  },
]

export default function ReturnProcessLayout({ children }: PropsWithChildren) {
  return (
    <ReturnProcessContextProvider steps={steps}>
      <div className="flex h-[100dvh] overflow-hidden bg-paleBlue">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <ReturnProcessHeader />
          <main className="grow">{children}</main>
        </div>
      </div>
    </ReturnProcessContextProvider>
  )
}

export const getLayout = (page: React.ReactElement) => {
  return <ReturnProcessLayout>{page}</ReturnProcessLayout>
}
