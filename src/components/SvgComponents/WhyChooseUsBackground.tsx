import { cn } from '@/lib/utils'
import { type IconType } from './types'

export default function WhyChooseUsBackground({
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
      <style type="text/css">
        .st0{'fill-rule:evenodd;clip-rule:evenodd;fill:#052A42;'}
        .st1{'fill:#052A42;'}
      </style>
      <path
        d="m0 1080 80-17c80-18 240-52 400-70 160-17 320-17 480 0 160 18 320 52 480 52s320-34 400-52l80-17v-207h-80-400s-320 0-480 0-320 0-480 0-320 0-400 0h-80v311z"
        className="st0"
      />
      <path
        d="m1920 0-80 17c-80 18-240 52-400 70-160 17-320 17-480 0-160-18-320-52-480-52s-320 34-400 52l-80 17v207h80 400s320 0 480 0 320 0 480 0 320 0 400 0h80v-311z"
        className="st0"
      />
      <rect y="203" width="1920" height="603" className="st1" />
    </svg>
  )
}
