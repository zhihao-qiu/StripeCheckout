import type { IconType } from 'react-icons'

export type CardItemProps = {
  step: number | IconType
  icon: React.JSX.Element
  title?: string
  description: string
}
