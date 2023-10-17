import { cn } from '@/lib/utils'
import { type IconType } from './types'

export default function OurFoundersBackground({
  className,
  ...rest
}: IconType) {
  return (
    <svg
      preserveAspectRatio="none"
      version="1.1"
      viewBox="0 0 1920 1080"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-36 w-36 shrink', className)}
      {...rest}
    >
      <path
        d="m0 0 80 17c80 18 240 52 400 70 160 17 320 17 480 0 160-18 320-52 480-52s320 34 400 52l80 17v207h-480s-320 0-480 0-320 0-480 0-320 0-400 0h-80v-311z"
        className="st0"
      />
      <path
        d="m1919.4 1064-80-17c-80-18-240.1-52-400.1-70-160-17-320.1-17-480.1 0-160 18-320.1 52-480.1 52s-320.1-34-400.1-52l-80-17v-207h480.1s320.1 0 480.1 0 320.1 0 480.1 0 320.1 0 400.1 0h80v311z"
        className="st0"
      />
      <path
        d="m1920 1063.5-80-17c-80-18-240.1-52-400.1-70-160-17-320.1-17-480.1 0-160 18-320.1 52-480.1 52s-320.1-34-400.1-52l-80-17v-207h480.1s320.1 0 480.1 0 320.1 0 480.1 0 320.1 0 400.1 0h80v311z"
        className="st1"
      />
      <path d="M0,309h1920v464H0V309z" className="st2" />
    </svg>
  )
}
