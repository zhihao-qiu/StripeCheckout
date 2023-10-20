import React from 'react'
import { getLayout } from '@/layouts/DefaultLayout'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import {
  ReturnProcessBackButton,
  ReturnProcessNextButton,
} from '@/components/ui/common'

function Pickup() {
  const [selectedMethod, setSelectedMethod] = useState('')
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value
    setSelectedMethod(newValue)
    const form = document.getElementById('selectPickupMethod')!
    if (form) {
      const radioInputs = form.querySelectorAll('input[type="radio"]')

      const inputArray: HTMLInputElement[] = Array.from(radioInputs).filter(
        (element): element is HTMLInputElement =>
          element instanceof HTMLInputElement
      )
      inputArray.forEach((input) => {
        const parentDiv: HTMLElement | null = input.parentNode
          ?.parentNode as HTMLElement | null
        if (parentDiv) {
          if (input.checked) {
            parentDiv.classList.remove('border-brand')
            parentDiv.classList.add('border-primary')
            parentDiv.classList.remove('opacity-50')
            parentDiv.classList.add('selected')
          } else {
            parentDiv.classList.add('border-brand')
            parentDiv.classList.remove('border-primary')
            parentDiv.classList.add('opacity-50')
            parentDiv.classList.remove('selected')
          }
        }
      })
    }
  }

  useEffect(() => {
    const selected = document.getElementsByClassName('selected')
    console.log(selected[0])
  }, [selectedMethod])

  return (
    <div className="mx-5 my-5">
      <div className="text-largeText text-brand">Pickup Details</div>
      <div className="text-brand">Which pickup method do you prefer?</div>
      <form id="selectPickupMethod" className="mt-5 flex justify-center">
        <div className="mx-1/5 flex w-3/4 flex-row justify-center">
          <div className="mx-4 flex max-w-[40%] flex-col justify-between rounded-[12px] border-4  border-brand px-4 py-2">
            <Label
              htmlFor="handoff"
              className="flex h-1/6 justify-center md:h-1/5"
            >
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 79.1 83"
                className="fill-primary"
              >
                <path
                  d="M0,73.1c0,0.8,0.7,1.5,1.5,1.5h23.7l2.3,1.7l7.9,5.8c0.8,0.6,1.8,0.9,2.7,0.9c1.4,0,2.8-0.6,3.7-1.8
	c0.3-0.4,0.6-0.9,0.7-1.5c0.6,0.3,1.3,0.5,2,0.5c0.2,0,0.5,0,0.7-0.1c1.2-0.2,2.3-0.8,3-1.8c0.3-0.4,0.6-0.9,0.7-1.5
	c0.7,0.3,1.4,0.5,2.1,0.5c1.4,0,2.8-0.6,3.7-1.8c0.2-0.3,0.4-0.7,0.5-1h22.4c0.8,0,1.5-0.7,1.5-1.5V16.3c0,0,0-0.1,0-0.1
	c0,0,0-0.1,0-0.1c0-0.1,0-0.2-0.1-0.3c0,0,0,0,0,0c-0.1-0.1-0.1-0.2-0.2-0.3c0,0,0,0,0,0L67.2,0.6C66.9,0.2,66.4,0,66,0H45.4H33.7
	H13.1c-0.5,0-0.9,0.2-1.2,0.6L0.3,15.4c0,0,0,0,0,0c-0.1,0.1-0.1,0.2-0.2,0.3c0,0,0,0,0,0C0.1,15.9,0,16,0,16.1c0,0,0,0.1,0,0.1
	c0,0,0,0.1,0,0.1C0,16.3,0,73.1,0,73.1z M3,71.6V58.1l8.2,6c0.3,0.2,0.6,0.3,0.9,0.3c0.1,0,0.1,0,0.2,0l0,0c0.3,0.6,0.7,1.1,1.3,1.5
	l7.6,5.6L3,71.6L3,71.6z M24.6,43.5C24.6,43.5,24.6,43.5,24.6,43.5l-11,14.9l-1.9,2.5L6,56.6l13.2-17.9L25,43L24.6,43.5z M50,74.1
	L47.2,72c0,0,0,0,0,0l-10.7-7.9c-0.7-0.5-1.6-0.3-2.1,0.3c-0.5,0.7-0.3,1.6,0.3,2.1l10.7,7.9c0.3,0.2,0.5,0.6,0.6,1
	c0.1,0.4,0,0.8-0.3,1.2s-0.6,0.6-1,0.6c-0.4,0.1-0.8,0-1.2-0.3L32.9,69c-0.7-0.5-1.6-0.3-2.1,0.3c-0.5,0.7-0.3,1.6,0.3,2.1l7.9,5.8
	c0.3,0.2,0.5,0.6,0.6,1c0.1,0.4,0,0.8-0.3,1.2c-0.5,0.7-1.5,0.8-2.2,0.3l-7.9-5.8L15.3,63.5c-0.3-0.2-0.5-0.6-0.6-1
	c-0.1-0.4,0-0.8,0.3-1.1l12-16.2c0.2-0.3,0.6-0.5,1-0.6l13.4-2c0.2,1.7-1.1,3.3-2.8,3.5L33.3,47c-0.6,0.1-1.1,0.5-1.2,1.1
	s0.1,1.2,0.6,1.6l9.4,7l10.7,7.9c0.3,0.2,0.5,0.6,0.6,1c0.1,0.4,0,0.8-0.3,1.2s-0.6,0.6-1,0.6c-0.4,0.1-0.8,0-1.2-0.3l-10.7-7.9
	c-0.7-0.5-1.6-0.3-2.1,0.3c-0.5,0.7-0.3,1.6,0.3,2.1L49,69.5l0,0l2.9,2.1c0.3,0.2,0.5,0.6,0.6,1c0,0,0,0.1,0,0.1c0,0.1,0,0.2,0,0.3
	c0,0,0,0.1,0,0.1c0,0.2-0.1,0.4-0.3,0.6C51.7,74.5,50.7,74.6,50,74.1z M76.1,71.6H55.3c-0.2-0.7-0.6-1.3-1.1-1.9
	c0.5-0.3,0.9-0.7,1.2-1.1c0.7-1,1-2.2,0.8-3.4s-0.8-2.3-1.8-3l-10.7-7.9l-6.5-4.8l1.8-0.3c1.7-0.2,3.1-1.1,4.1-2.5s1.4-3,1.2-4.7
	c-0.1-0.7-0.5-1.4-1.1-1.8s-1.3-0.6-2.1-0.5l-13,1.9c-0.1-0.1-0.1-0.1-0.2-0.2l-8.2-6.1c-0.7-0.5-1.6-0.3-2.1,0.3L3,55.5V17.8h26.7
	v12.8c0,0.5,0.3,1,0.8,1.3c0.5,0.3,1.1,0.2,1.5,0l7.6-4.7l7.6,4.7c0.2,0.2,0.5,0.2,0.8,0.2c0.2,0,0.5-0.1,0.7-0.2
	c0.5-0.3,0.8-0.8,0.8-1.3V17.8h26.7V71.6z M32.7,17.8h13.8v10.1l-6.1-3.8c-0.2-0.2-0.5-0.2-0.8-0.2S39,24,38.7,24.1l-6.1,3.8
	C32.7,27.9,32.7,17.8,32.7,17.8z M74.5,14.8H49.2L47.2,3h18.1L74.5,14.8z M44.1,3l2,11.8H32.9L35,3H44.1z M13.8,3h18.1l-2,11.8H4.6
	L13.8,3z"
                />
              </svg>
            </Label>
            <Label
              htmlFor="handoff"
              className="sm: flex h-1/6 h-[10%] justify-center text-center text-sm font-bold md:text-smallText"
            >
              Direct Handoff{' '}
            </Label>
            <Label
              htmlFor="handoff"
              className="flex h-1/2 justify-center text-center text-sm sm:min-h-0 lg:text-base"
            >
              {' '}
              Hand the package directly to our specialist at your door{' '}
            </Label>
            <div className="flex justify-center">
              <Input
                type="radio"
                id="handoff"
                value="handoff"
                name="pickupMethod"
                checked={selectedMethod === 'handoff'}
                onChange={handleRadioChange}
              />
            </div>
          </div>

          <div className="mx-4 flex max-w-[40%]  flex-col justify-between rounded-[12px] border-4 border-brand px-4 py-2">
            <Label
              htmlFor="doorstep"
              className="flex h-1/6  justify-center md:h-1/5"
            >
              <img
                className="text-primary"
                src="/images/pickup.svg"
                alt="Pickup At Door"
              />
            </Label>
            <Label
              htmlFor="doorstep"
              className="sm: flex h-1/6 h-[10%] justify-center text-center text-sm font-bold md:text-smallText"
            >
              Leave on Doorstep{' '}
            </Label>
            <Label
              htmlFor="doorstep"
              className="flex h-1/2 justify-center text-center text-sm sm:min-h-0 lg:text-base"
            >
              {' '}
              Place items outside your door ahead of your pick up window{' '}
            </Label>
            <div className="flex justify-center">
              <Input
                type="radio"
                id="doorstep"
                value="doorstep"
                name="pickupMethod"
                checked={selectedMethod === 'doorstep'}
                onChange={handleRadioChange}
              />
            </div>
          </div>
        </div>
      </form>

      <span className="mt-5 flex justify-between">
        <Link href="/address">
          <ReturnProcessBackButton />
        </Link>
        <Link href="/temp-dashboard">
          <ReturnProcessNextButton />
        </Link>
      </span>
    </div>
  )
}

Pickup.getLayout = getLayout

export default Pickup
