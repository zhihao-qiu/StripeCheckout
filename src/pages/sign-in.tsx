import React, { useState } from 'react'
import Image from 'next/image'
import SignInForm from '@/components/SignInForm/SignInForm'
import GuestSignInForm from '@/components/SignInForm/GuestSignInForm'
import { useRouter } from 'next/router'

function SignIn() {
  const router = useRouter()
  const [isGuest, setIsGuest] = useState(false)

  return (
    <div className="bg-paleBlue relative flex min-h-screen w-screen flex-col items-center justify-start  transition-opacity delay-500">
      <Image
        src="/images/returnpal-short-logo.png"
        alt="Return Pal logo"
        width="0"
        height="0"
        sizes="100vw"
        className="my-8 h-[40px] w-auto sm:my-12"
      />

      <p className="mb-8 text-2xl font-semibold sm:text-subtitle">
        <span
          className={`hover:cursor-pointer ${
            isGuest ? 'text-grey' : 'text-brand'
          }`}
          onClick={() => setIsGuest(false)}
        >
          Sign In
        </span>
        <span className="text-4xl font-normal text-primary sm:text-title">
          {' | '}
        </span>
        <span
          className={`hover:cursor-pointer ${
            isGuest ? 'text-brand' : 'text-grey'
          }`}
          onClick={() => setIsGuest(true)}
        >
          Guest
        </span>
      </p>

      {isGuest ? <GuestSignInForm /> : <SignInForm />}

      <button
        type="button"
        onClick={() => router.back()}
        className="absolute bottom-[40px] left-[13%] flex items-center bg-transparent text-base font-normal text-primary sm:bottom-[80px] sm:left-[10%] sm:text-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <span>&nbsp;Back</span>
      </button>
    </div>
  )
}

export default SignIn
