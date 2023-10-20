import { ReturnProcessContext } from '@/context/ReturnProcessContext'
import { useContext } from 'react'

export function useReturnProcess() {
  const context = useContext(ReturnProcessContext)

  if (!context) {
    throw new Error(
      'useReturnProcess is supposed to be used in a component thats wrapped in ReturnProcessContext'
    )
  }

  return { ...context }
}
