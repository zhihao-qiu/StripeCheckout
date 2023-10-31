import ScrollDownChevron from './ScrollDownChevron'

export interface Props {
  scrollDown: () => void
}

export default function ScrollContainer({ scrollDown }: Props) {
  return (
    <div
      className="left-[50%] top-[91%] z-10 hidden translate-x-[-50%] translate-y-[-50%] flex-col items-center hover:scale-105 hover:cursor-pointer sm:fixed sm:flex"
      onClick={scrollDown}
    >
      <div className="h-10 w-12 text-primary hover:text-gradientL">
        <ScrollDownChevron />
      </div>
      <div className="text-xs">scroll</div>
    </div>
  )
}
