import { type PropsWithChildren } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function DefaultLayout({
  children,
  isHeaderShow = true,
  isFooterShow = true,
}: PropsWithChildren & {
  isHeaderShow?: boolean
  isFooterShow?: boolean
}) {
  return (
    <>
      <div className="flex h-[100dvh] overflow-hidden bg-paleBlue">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {isHeaderShow ? <Header /> : null}
          <main className="grow">{children}</main>
          {isFooterShow ? <Footer /> : null}
        </div>
      </div>
    </>
  )
}

export const getLayout = (page: React.ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}
