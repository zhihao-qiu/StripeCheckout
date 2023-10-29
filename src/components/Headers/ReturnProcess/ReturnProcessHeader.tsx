import Link from 'next/link'
import ReturnPalTitle from '../../SvgComponents/ReturnPalTitle'
import { HeaderContent, HeaderLogoRoot, HeaderRoot, HeaderSub } from '../Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Logo from '../../SvgComponents/Logo'
import { cn } from '@/lib/utils'
import { useReturnProcess } from '@/hooks/useReturnProcess'

type ProgressBarProps2 = {
  name: string
  state: 'not-completed' | 'in-progress' | 'completed'
  start?: boolean
}

function ProgressBarItem({ name, start = false, state }: ProgressBarProps2) {
  return (
    <div className="w-1/4">
      <div className="relative mb-2">
        <div className="align-center absolute top-5 flex w-full translate-x-[-50%] translate-y-[-50%]  content-center items-center align-middle">
          {!start && (
            <div
              className={cn(
                'align-center z-10 h-1 w-full flex-1 items-center rounded bg-primary align-middle',
                (state === 'completed' || state === 'in-progress') && 'h-2'
              )}
            />
          )}
        </div>

        <div
          className={cn(
            'relative z-30 mx-auto flex h-10 w-10 items-center rounded-full border-2 border-primary bg-brand text-lg text-white',
            state === 'in-progress' && 'border-[6px]',
            state === 'completed' && 'bg-primary'
          )}
        >
          {state === 'completed' && (
            <span className="flex w-full items-center justify-center text-center text-gray-600">
              <FontAwesomeIcon
                icon={faCheck}
                width="25"
                height="25"
                className="text-center text-white"
              />
            </span>
          )}
        </div>
      </div>
      <p
        className={cn(
          'select-none text-center text-xs text-white md:text-base',
          state === 'in-progress' && 'font-extrabold'
        )}
      >
        {name}
      </p>
    </div>
  )
}

export default function ReturnProcessHeader() {
  const returnProcess = useReturnProcess()
  return (
    <HeaderRoot className="border-brand bg-brand px-0 sm:px-9">
      <HeaderSub>
        <Link href="/">
          <HeaderLogoRoot>
            <ReturnPalTitle className="hidden h-10 w-40 fill-white lg:flex" />
            <Logo className="hidden h-7 w-7 shrink-0 fill-primary sm:flex" />
          </HeaderLogoRoot>
        </Link>

        <HeaderContent className="items-center justify-center sm:flex">
          <div className="flex w-full">
            {returnProcess.steps.map((step, index) => {
              const state = returnProcess.isFinished
                ? 'completed' // If process is finished, mark every option as completed
                : returnProcess.currentStepIndex === index // Mark the current step as in-progress
                ? 'in-progress'
                : returnProcess.currentStepIndex > index // Mark all previous steps as completed and the options in front as not-completed
                ? 'completed'
                : 'not-completed'
              return (
                <ProgressBarItem
                  key={step.id}
                  start={index === 0}
                  name={step.name}
                  state={state}
                />
              )
            })}
          </div>
        </HeaderContent>
      </HeaderSub>
    </HeaderRoot>
  )
}
