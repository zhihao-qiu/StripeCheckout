import { useReturnProcess } from '@/hooks/useReturnProcess'
import { getLayout } from '@/layouts/ReturnProcessLayout'

export default function ReturnProcess() {
  const { getCurrentStep } = useReturnProcess()
  return getCurrentStep.component
}

ReturnProcess.getLayout = getLayout
