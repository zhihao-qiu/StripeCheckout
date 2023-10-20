import { useMemo, type PropsWithChildren, useState, createContext } from 'react'

export type ReturnProcessContextType = {
  editing: boolean
  setEditing: (value: boolean) => void
}

export const ReturnProcessContext = createContext<
  ReturnProcessContextType | undefined
>(undefined)

export default function ReturnProcessContextProvider({
  children,
}: PropsWithChildren) {
  const [editing, setEditing] = useState(false)
  const returnProcessContextValue = useMemo(
    () => ({
      editing,
      setEditing,
    }),
    [editing, setEditing]
  )

  return (
    <ReturnProcessContext.Provider value={returnProcessContextValue}>
      {children}
    </ReturnProcessContext.Provider>
  )
}
