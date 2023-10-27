import { Button } from '@/components/ui/button'
import { useReturnProcess } from '@/hooks/useReturnProcess'

export default function TestReturnProcessRender() {
  const { getCurrentStep, currentStepIndex, forward, back } = useReturnProcess()
  return (
    <>
      {/* {' '}
      <Button
        onClick={() => {
          back()
        }}
      >
        Back
      </Button>
      {currentStepIndex}{' '}
      <Button
        onClick={() => {
          forward()
        }}
      >
        Next
      </Button> */}
      {getCurrentStep?.component}
    </>
  )
}
