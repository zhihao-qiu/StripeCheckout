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
      <div
        className={`flex h-[100dvh] overflow-hidden ${nunito.className} bg-paleBlue`}
      >
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export const getLayout = (page: React.ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}
