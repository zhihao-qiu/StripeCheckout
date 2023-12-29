import {
  useMemo,
  type PropsWithChildren,
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import type { UserInfo } from '@components/DashBoard/types'

export type ReturnProcessStep = {
  id: string
  name: string
  component: JSX.Element
}

export type FileUploadType = {
  attachment: string
  labelType: 'Physical' | 'Digital' | 'Amazon'
  description: string | undefined
}

export type ReturnProcessFullObjectType = {
  userInfo: UserInfo
  dateAndTime: string
  contact_full_name: string
  contact_phone_number: string
  deliveryAddress: string
  deliveryOption: 'Direct Handoff' | 'Leave on Doorstep'
  subscription: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
  labelFileUploads: FileUploadType[]
  instructions?: string
}

export type ReturnProcessContextType = {
  steps: ReturnProcessStep[]
  currentStepIndex: number
  isFinished: boolean
  setIsFinished: Dispatch<SetStateAction<boolean>>
  setCurrentStepIndex: Dispatch<SetStateAction<number>>
  currentData: ReturnProcessFullObjectType
  setCurrentData: Dispatch<SetStateAction<ReturnProcessFullObjectType>>
}

export const ReturnProcessContext = createContext<ReturnProcessContextType>(
  {} as ReturnProcessContextType
)

type ReturnProcessContextProviderType = {
  steps: ReturnProcessContextType['steps']
}

export default function ReturnProcessContextProvider({
  children,
  steps,
}: PropsWithChildren<ReturnProcessContextProviderType>) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [currentData, setCurrentData] = useState<ReturnProcessFullObjectType>(
    {} as ReturnProcessFullObjectType
  )
  const returnProcessContextValue = useMemo(
    () => ({
      currentStepIndex,
      setCurrentStepIndex,
      steps,
      currentData,
      setCurrentData,
      isFinished,
      setIsFinished,
    }),
    [currentData, currentStepIndex, isFinished, steps]
  )
  return (
    <ReturnProcessContext.Provider value={returnProcessContextValue}>
      {children}
    </ReturnProcessContext.Provider>
  )
}
