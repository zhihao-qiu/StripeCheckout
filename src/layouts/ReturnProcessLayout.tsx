import { type PropsWithChildren } from 'react'
import ReturnProcessHeader from '@/components/Headers/ReturnProcess/ReturnProcessHeader'
import ReturnProcessContextProvider from '@/context/ReturnProcessContext'

export default function ReturnProcessLayout({ children }: PropsWithChildren) {
  return (
    <ReturnProcessContextProvider>
      <div className={`flex min-h-[100dvh] overflow-hidden bg-paleBlue`}>
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
