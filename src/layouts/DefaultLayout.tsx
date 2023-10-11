import { Nunito } from 'next/font/google'
import { type PropsWithChildren } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const nunito = Nunito({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div
          className={`bg-paleBlue relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ${nunito.className}`}
        >
          <Header />
          <main className=" mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export const getLayout = (page: React.ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}
