import { Toaster } from '@/components/ui/toaster'
import { type NextPage } from 'next'
import { type AppProps } from 'next/app'
import { type AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import { type ReactElement, type ReactNode } from 'react'

import '@/styles/globals.css'

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  const layout = getLayout(<Component {...pageProps} />)
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {layout}
      <Toaster />
    </>
  )
}

export default MyApp
