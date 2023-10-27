import { getDateFrom } from '@/lib/utils'
import { useMemo, useState } from 'react'

const DAYS_TO_FETCH = 7

export function useDateSelection(initialDate: Date) {
  const [initialStartingDate] = useState<Date>(initialDate)
  const [cursorStartDate, setCursorStartingDate] = useState<Date>(initialDate)

  const getCurrentDays = useMemo(() => {
    const dateArray = []
    const currentDate = new Date(cursorStartDate)
    for (let i = 0; i < DAYS_TO_FETCH; i++) {
      dateArray.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dateArray
  }, [cursorStartDate])

  function forward() {
    setCursorStartingDate((prev) => getDateFrom(prev, DAYS_TO_FETCH))
  }

  function back() {
    const newDate = getDateFrom(cursorStartDate, -DAYS_TO_FETCH)
    if (canGoBackwards()) {
      setCursorStartingDate(newDate)
    }
  }

  function canGoBackwards() {
    return cursorStartDate.getTime() > initialStartingDate.getTime()
  }

  return {
    back,
    forward,
    getCurrentDays,
    canGoBackwards,
    initialDate: initialStartingDate,
  }
}
