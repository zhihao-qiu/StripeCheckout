import { getLayout } from '@/layouts/DefaultLayout'
import SignUpModal from '@components/SignUpModal'

export default function Test() {
  return (
    <>
      <SignUpModal />
    </>
  )
}

Test.getLayout = getLayout
