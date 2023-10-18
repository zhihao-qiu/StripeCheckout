import React from 'react'
import { getLayout } from '@/layouts/DefaultLayout'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import Router from 'next/router'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'

function Address() {
  const [addresses, setAddresses] = useState<
    { name: string; address: string; default: boolean }[]
  >([])
  const [addAddress, setAddAddress] = useState(false)
  const { toast } = useToast()

  // const handleRadioChange = (event: any) => {
  //   setSelectedMethod(event.target.value);
  //   const form = document.getElementById("selectPickupMethod") as HTMLElement;
  //   if (form) {
  //     const radioInputs = form.querySelectorAll('input[type="radio"]');
  //     let selectedValue;

  //     radioInputs.forEach(function (input: any) {
  //       const parentDiv: HTMLElement = input.parentNode?.parentNode;
  //       if (parentDiv) {
  //         if (input.checked) {
  //           parentDiv?.classList.remove("border-brand");
  //           parentDiv?.classList.add("border-primary");
  //           parentDiv?.classList.remove("opacity-50")
  //         } else {
  //           parentDiv?.classList.add("border-brand");
  //           parentDiv?.classList.remove("border-primary");
  //           parentDiv?.classList.add("opacity-50")
  //         }
  //       }
  //     });
  //     setStep(2);
  //   }

  // };
  const mockAddresses: { name: string; address: string; default: boolean }[] = [
    {
      name: 'Bob Gunderson',
      address: '6500 Boulevard de Rome, Brossard, QC, J4Y 0B6, Canada',
      default: true,
    },
    {
      name: 'Marky Mark',
      address: '123 King St',
      default: false,
    },
  ]
  const addressSchema = z.object({
    name: z.string().min(2),
    address: z.string().min(3).max(50),
    city: z.string().min(3).max(50),
    province: z.string().min(2).max(2),
    postal: z.string().min(6),
  })
  const validateFormData = (inputs: unknown) => {
    const isValidData = addressSchema.parse(inputs)
    return isValidData
  }
  const addressValidator = (addressObj: {
    name: string
    address: string
    city: string
    province: string
    postal: string
  }) => {
    try {
      const valid = validateFormData(addressObj)
      if (!valid) {
        return
      }
      console.log(valid)
      console.log('adding new address to profile!')
      const newAddress: { name: string; address: string; default: boolean } = {
        name: addressObj.name,
        address: `${addressObj.address}, ${addressObj.city}, ${addressObj.province}, ${addressObj.postal}`,
        default: false,
      }
      setAddresses([...addresses, newAddress])
    } catch (err) {
      console.log(err)
      toast({
        variant: 'destructive',
        description:
          'Please ensure that all fields are filled in, province field contains only two letters, and postal code is correct',
      })
    }
  }
  useEffect(() => {
    setAddresses(mockAddresses)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const addNewAddress = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as HTMLFormElement
    const addressToAdd = {
      name: (target[0] as HTMLInputElement).value,
      address: (target[1] as HTMLInputElement).value,
      city: (target[2] as HTMLInputElement).value,
      province: (target[3] as HTMLInputElement).value,
      postal: (target[4] as HTMLInputElement).value,
    }
    addressValidator(addressToAdd)
  }
  const toggleAddressForm = () => {
    setAddAddress(!addAddress)
  }
  const handleAddressSelection = () => {
    const form = document.getElementById('selectAddressForm')
    if (form) {
      const radioInputs = form.querySelectorAll('input[type="radio"]')
      let selectedValue: string | undefined

      radioInputs.forEach((element: Element) => {
        if (element instanceof HTMLInputElement) {
          const input = element
          if (input.checked) {
            selectedValue = input.value
          }
        }
      })
      console.log(selectedValue)

      if (selectedValue) {
        void Router.push('/pickup')
      } else {
        toast({
          variant: 'destructive',
          description: 'Please select an address before proceeding.',
        })
      }
    }
  }
  const addressArrayMapper = (
    addressArray: { name: string; address: string; default: boolean }[]
  ) => {
    return addressArray.map((address) => {
      return (
        <div
          key={addressArray.indexOf(address)}
          className="fontSize-large my-7 flex h-10 w-full items-center "
        >
          <Input
            type="radio"
            id={address.address}
            value={address.address}
            name="address"
            className="mx-2 h-6 w-8 w-[10%]"
          />{' '}
          <Label
            htmlFor={address.address}
            className="break-word mx-2  w-[20%] font-bold sm:w-[10%] "
          >
            {address.name}{' '}
          </Label>{' '}
          <Label
            htmlFor={address.address}
            className="break-word my-2 w-[35%] max-w-max py-2 sm:w-[50%] "
          >
            {' '}
            {address.address}{' '}
          </Label>{' '}
          <Label
            htmlFor={address.address}
            className="mx-2 w-[10%] font-bold text-primary"
          >
            {address.default && 'Default address'}
          </Label>
        </div>
      )
    })
  }

  return (
    <div className="mx-5 my-5">
      <div className="text-largeText text-brand">Pickup Details</div>
      <div>
        <div className="text-brand">Select or add your pickup address</div>
        <div className="mt-5 text-smallText font-bold text-brand">
          Your Addresses:
        </div>
        <Separator className="w-3/4 border-t-2 border-black" />
        <div>
          <form id="selectAddressForm" className="mt-5">
            {addresses.length && addressArrayMapper(addresses)}
          </form>
        </div>
        <Button
          className="bg-transparent font-bold text-primary hover:bg-transparent"
          onClick={toggleAddressForm}
        >
          + Add a new address{' '}
        </Button>
        {addAddress && (
          <form
            className="flex-column flex w-3/4 justify-around"
            onSubmit={(e) => addNewAddress(e)}
          >
            <div className="flex-column flex">
              <div className="flex flex-row items-center ">
                <div className="mr-5 items-center">
                  <div className="my-2 flex items-center">
                    <Label className="w-1/3">Name:</Label>
                    <Input type="text" name="name" className="my-2  w-3/4" />
                  </div>
                  <div className="my-2 flex items-center">
                    <Label className="w-1/3">Address: </Label>
                    <Input type="text" name="address" className="my-2  w-3/4" />
                  </div>
                  <div className="my-2 flex items-center">
                    <Label className="w-1/3">City: </Label>
                    <Input type="text" name="address" className="my-2 w-3/4" />
                  </div>
                  <div className="my-2 flex items-center">
                    <Label className="w-1/3">Province: (e.g. ON) </Label>
                    <Input type="text" name="address" className="my-2  w-3/4" />
                  </div>
                  <div className="my-2 flex items-center">
                    <Label className="w-1/3">Postal Code </Label>
                    <Input type="text" name="address" className="my-2  w-3/4" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-around">
              <button className="h-1/4 text-primary" type="submit">
                Add new address
              </button>
            </div>
          </form>
        )}
        <span className="mt-5 flex justify-between">
          <Link href="/pick-date">
            <Button className="bg-transparent font-bold text-primary hover:bg-transparent ">
              ← Back{' '}
            </Button>
          </Link>
          {/* TODO: Validate form - This link is only here for viewing purposes! Will be changed later */}
          <Link href="/pickup">
            <Button
              className="next font-bold text-white"
              //onClick={handleAddressSelection}
            >
              {' '}
              Next →{' '}
            </Button>
          </Link>
        </span>
      </div>

      {/* {step === 2 && (<div><div className="text-brand">
        Which pickup method do you prefer?
      </div>
        <form id="selectPickupMethod" className="mt-5 flex justify-center">
          <div className="flex flex-row justify-center mx-1/5 w-3/4">
            <div className="justify-center border-4 border-brand rounded-[12px] mx-4  py-2 px-4 max-w-[40%]">
              <div className="flex justify-center text-smallText font-bold ">
                Direct Handoff </div>
              <div className="flex justify-center "> Hand the package directly to our specialist at your door </div>
              <div className="flex justify-center" >
                <Input type="radio" key="handoff" value="handoff" name="pickupMethod" checked={selectedMethod === 'handoff'}
                  onChange={handleRadioChange} />
              </div>
            </div>

            <div className="justify-center border-4 border-brand rounded-[12px] mx-4 py-2 px-4 max-w-[40%]">
              <div className="flex justify-center text-smallText font-bold ">
                Leave on Doorstep </div>
              <div className="flex justify-center"> Place items outside your door ahead of your pick up window </div>
              <div className="flex justify-center">

                <Input type="radio" key="doorstep" value="doorstep" name="pickupMethod" checked={selectedMethod === 'doorstep'}
                  onChange={handleRadioChange} />
              </div>
            </div>
          </div>
        </form>


        <span className="flex justify-between mt-5" >
          <Button className="bg-transparent hover:bg-transparent text-primary font-bold" onClick={() => setStep(1)}>← Back </Button>
          <Button className="next text-white font-bold" onClick={() => setStep(3)} > Next → </Button>
        </span></div>)} */}
    </div>
  )
}
Address.getLayout = getLayout

export default Address
