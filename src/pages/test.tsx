import { getLayout } from '@/layouts/DefaultLayout'
import Terms from '@components/Terms'
import { useState } from 'react'

export default function Test() {
  const [acceptance, setAcceptance] = useState(false)

  return (
    <>
      <Terms setAcceptance={setAcceptance} />
    </>
  )
}

Test.getLayout = getLayout
