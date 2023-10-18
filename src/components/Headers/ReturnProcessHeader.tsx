import Link from 'next/link'
import ReturnPalTitle from '../SvgComponents/ReturnPalTitle'
import { HeaderRoot, HeaderSub } from './Header'

export default function ReturnProcessHeader() {
  return (
    <HeaderRoot className="border-brand bg-brand">
      <HeaderSub className="gap-x-12">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <ReturnPalTitle className="hidden h-10 w-40 fill-white lg:flex" />
          </div>
        </Link>

        {/* <ol className="items-center justify-center sm:flex">
        <li className="relative mb-6 sm:mb-0">
          <div className="flex items-center">
            <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
              <FontAwesomeIcon
                icon={faCheck}
                width="15"
                height="15"
                className="text-white"
              />
            </div>
            <div className="hidden h-1 w-full bg-primary dark:bg-gray-700 sm:flex"></div>
          </div>
          <div className="abs mt-1 sm:pr-8">
            <p className="text-sm font-normal text-white">Pickup Date</p>
          </div>
        </li>
        <li className="relative mb-6 sm:mb-0">
          <div className="flex items-center">
            <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-primary" />
            <div className="hidden h-1 w-full bg-primary dark:bg-gray-700 sm:flex" />
          </div>
          <div className="abs mt-1 sm:pr-8">
            <p className="text-sm font-normal text-white">Pickup Details</p>
          </div>
        </li>
        <li className="relative mb-6 sm:mb-0">
          <div className="flex items-center">
            <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary" />
            <div className="hidden h-1 w-full bg-primary dark:bg-gray-700 sm:flex" />
          </div>
          <div className="abs mt-1 sm:pr-8">
            <p className="text-sm font-normal text-white">Pickup Date</p>
          </div>
        </li>
        <li className="relative mb-6 sm:mb-0">
          <div className="flex items-center">
            <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary" />
            <div className="hidden h-1 w-full bg-primary dark:bg-gray-700 sm:flex" />
          </div>
          <div className="abs mt-1 sm:pr-8">
            <p className="text-sm font-normal text-white">Pickup Date</p>
          </div>
        </li>
        <li className="relative mb-6 sm:mb-0">
          <div className="flex items-center">
            <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary" />
          </div>
          <div className="abs mt-1 sm:pr-8">
            <p className="text-sm font-normal text-white">Pickup Date</p>
          </div>
        </li>
      </ol> */}

        {/* <div className="w-full px-4">
        <div className="mx-auto w-full max-w-md">
          <div className="relative">
            <div className="absolute left-0 top-1/2 -mt-px h-0.5 w-full bg-primary" />
            <ul className="relative flex w-full justify-between">
              <li className="relative">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-4 border-primary bg-primary">
                  <FontAwesomeIcon
                    icon={faCheck}
                    width="15"
                    height="15"
                    className="text-white"
                  />
                </div>
                <div className="absolute left-[-1rem] right-0 m-auto w-screen text-sm text-white">
                  Pickup Date
                </div>
              </li>
              <li className="relative">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-4 border-primary bg-brand" />
                <div className="absolute left-[-2rem]  right-0 m-auto w-screen text-sm font-bold text-white">
                  Pickup Details
                </div>
              </li>
              <li>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-brand" />
              </li>
              <li>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-brand" />
              </li>
              <li>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-brand" />
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      </HeaderSub>
    </HeaderRoot>
  )
}
