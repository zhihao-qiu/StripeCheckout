import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { type PropsWithChildren } from 'react'

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-paleBlue">
          <Header />
          <main className="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getLayout = (page: React.ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}
