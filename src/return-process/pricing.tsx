import ChoosePlan from '@/components/ChoosePlan'
import Head from 'next/head'

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Return Process - Pricing</title>
      </Head>
      <div className="h-screen w-screen max-w-4xl">
        <ChoosePlan />
      </div>
    </>
  )
}
