import React from 'react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import {
  ReturnProcessBackButton,
  ReturnProcessNextButton,
  ReturnProcessRoot,
  ReturnProcessSection,
} from '@/components/common/return-process'
import { useReturnProcess } from '@/hooks/useReturnProcess'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Head from 'next/head'
import { addressSchema } from '@/components/DashBoard/types'
import { SectionDescription, SectionHeader } from '@/components/common/section'

const formSchema = z.object({
  address: z.string().min(1),
})

export default function Address() {
  const [addresses, setAddresses] = useState<
    { name: string; address: string; default: boolean }[]
  >([])
  const [addressFormVisibility, setAddressFormVisiblity] = useState(false)
  const [senderName, setSenderName] = useState<string | null>(null)
  const [addressFromForm, setAddressFromForm] = useState<newAddress | null>(
    null
  )
  const { toast } = useToast()
  const returnProcess = useReturnProcess()

  type newAddress = {
    apartmentUnitNumber?: string
    streetNumber?: number
    streetName?: string
    city?: string
    province?: string
    postal?: string
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: returnProcess.currentData.address,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Submitted:', values)
    returnProcess.setCurrentData(values)
    returnProcess.forward()
  }

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

  const validateFormData = (inputs: unknown) => {
    const isValidData = addressSchema.parse(inputs)
    return isValidData
  }
  const addressValidator = (name: string, addressObj: newAddress) => {
    try {
      const valid = validateFormData(addressObj)
      if (!valid) {
        return
      }
      console.log(valid)
      console.log('adding new address to profile!')
      let addressString
      if (addressObj.apartmentUnitNumber) {
        addressString = `${addressObj.apartmentUnitNumber}-${addressObj.streetNumber} ${addressObj.streetName}, ${addressObj.city}, ${addressObj.province}, ${addressObj.postal}`
      } else {
        addressString = `${addressObj.streetNumber} ${addressObj.streetName}, ${addressObj.city}, ${addressObj.province}, ${addressObj.postal}`
      }

      const newAddress: { name: string; address: string; default: boolean } = {
        name: name,
        address: addressString,
        default: false,
      }
      if (addresses.length === 0) {
        newAddress.default = true
      }
      setAddresses([...addresses, newAddress])
      setSenderName(null)
      setAddressFromForm(null)
    } catch (err: unknown) {
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
  const toggleAddressForm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.preventDefault()
    setAddressFormVisiblity(!addressFormVisibility)
  }
  const handleAddress = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    console.log(senderName)
    console.log(addressFromForm)
    if (senderName && addressFromForm) {
      addressValidator(senderName, addressFromForm)
    }
  }
  // const handleAddressSelection = () => {
  //   const form = document.getElementById('selectAddressForm')
  //   if (form) {
  //     const radioInputs = form.querySelectorAll('input[type="radio"]')
  //     let selectedValue: string | undefined

  //     radioInputs.forEach((element: Element) => {
  //       if (element instanceof HTMLInputElement) {
  //         const input = element
  //         if (input.checked) {
  //           selectedValue = input.value
  //         }
  //       }
  //     })
  //     console.log(selectedValue)

  //     if (selectedValue) {
  //       void Router.push('/pickup')
  //     } else {
  //       toast({
  //         variant: 'destructive',
  //         description: 'Please select an address before proceeding.',
  //       })
  //     }
  //   }
  // }
  // const addressArrayMapper = (
  //   addressArray: { name: string; address: string; default: boolean }[]
  // ) => {
  //   return addressArray.map((address) => {
  //     return (
  //       <div
  //         key={addressArray.indexOf(address)}
  //         className="fontSize-large my-7 flex h-10 w-full items-center "
  //       >
  //         <Input
  //           type="radio"
  //           id={address.address}
  //           name="address"
  //           className="mx-2 h-6 w-[10%]"
  //         />{' '}
  //         <Label
  //           htmlFor={address.address}
  //           className="break-word mx-2  w-[20%] font-bold sm:w-[10%] "
  //         >
  //           {address.name}{' '}
  //         </Label>{' '}
  //         <Label
  //           htmlFor={address.address}
  //           className="break-word my-2 w-[35%] max-w-max py-2 sm:w-[50%] "
  //         >
  //           {' '}
  //           {address.address}{' '}
  //         </Label>{' '}
  //         <Label
  //           htmlFor={address.address}
  //           className="mx-2 w-[10%] font-bold text-primary"
  //         >
  //           {address.default && 'Default address'}
  //         </Label>
  //       </div>
  //     )
  //   })
  // }

  return (
    <>
      <Head>
        <title>Return Process - Pick Address</title>
      </Head>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ReturnProcessRoot>
            <ReturnProcessSection>
              <SectionHeader>Pickup Details</SectionHeader>
              <SectionDescription>
                Select or add your pickup address
              </SectionDescription>
            </ReturnProcessSection>
            <div>
              {/* <div className="text-largeText text-brand">Pickup Details</div> */}
              <div>
                {/* <div className="text-brand">
                  Select or add your pickup address
                </div> */}
                <div className="mt-5 text-smallText font-bold text-brand">
                  Your Addresses:
                </div>
                <Separator className="h-[0.15rem] w-3/4 rounded-full bg-brand" />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {addresses.map((address) => {
                            return (
                              <FormItem
                                key={address.address}
                                className="my-5 flex h-10 w-full items-center"
                              >
                                <RadioGroupItem
                                  id={address.address}
                                  value={address.address}
                                />
                                <Label
                                  htmlFor={address.address}
                                  className="break-word md:mx-0w-[20%]  mx-2 ml-2 font-bold sm:w-[10%] "
                                >
                                  {address.name}
                                </Label>
                                <Label
                                  htmlFor={address.address}
                                  className="break-word mx-2 my-2 w-[35%] max-w-max py-2 sm:w-[50%] md:mx-0 "
                                >
                                  {address.address}
                                </Label>
                                <Label
                                  htmlFor={address.address}
                                  className="mx-2 w-[10%] font-bold text-primary"
                                >
                                  {address.default && 'Default address'}
                                </Label>
                              </FormItem>
                            )
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="bg-transparent font-bold text-primary hover:bg-transparent"
                  onClick={(e) => toggleAddressForm(e)}
                >
                  + Add a new address{' '}
                </Button>
                {addressFormVisibility && (
                  <form className="flex-column flex w-3/4 justify-around">
                    <div className="flex-column flex">
                      <div className="flex flex-row items-center ">
                        <div className="mr-5 items-center">
                          <div className="my-2 flex items-center">
                            <Label className="w-1/3">Name:</Label>
                            <Input
                              type="text"
                              name="name"
                              className="my-2  w-3/4"
                              onChange={(e) => setSenderName(e.target.value)}
                            />
                          </div>
                          <div className="my-2 flex items-center">
                            <Label className="w-1/3">Apt # </Label>
                            <Input
                              type="text"
                              name="address"
                              className="my-2  w-3/4"
                              onChange={(e) =>
                                setAddressFromForm({
                                  ...addressFromForm,
                                  apartmentUnitNumber: e.target.value,
                                })
                              }
                            />
                            <Label className="w-1/3">Street # </Label>
                            <Input
                              type="text"
                              name="address"
                              className="my-2  w-3/4"
                              onChange={(e) =>
                                setAddressFromForm({
                                  ...addressFromForm,
                                  streetNumber: Number(e.target.value),
                                })
                              }
                            />
                          </div>
                          <div className="my-2 flex items-center"></div>
                          <div className="my-2 flex items-center">
                            <Label className="w-1/3">Street Name: </Label>
                            <Input
                              type="text"
                              name="address"
                              className="my-2  w-3/4"
                              onChange={(e) =>
                                setAddressFromForm({
                                  ...addressFromForm,
                                  streetName: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="my-2 flex items-center">
                            <Label className="w-1/3">City: </Label>
                            <Input
                              type="text"
                              name="address"
                              className="my-2 w-3/4"
                              onChange={(e) =>
                                setAddressFromForm({
                                  ...addressFromForm,
                                  city: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="my-2 flex items-center">
                            <Label className="w-1/3">
                              Province: (e.g. ON){' '}
                            </Label>
                            <Input
                              type="text"
                              name="address"
                              className="my-2  w-3/4"
                              onChange={(e) =>
                                setAddressFromForm({
                                  ...addressFromForm,
                                  province: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="my-2 flex items-center">
                            <Label className="w-1/3">Postal Code </Label>
                            <Input
                              type="text"
                              name="address"
                              className="my-2  w-3/4"
                              onChange={(e) =>
                                setAddressFromForm({
                                  ...addressFromForm,
                                  postal: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-around">
                      <Button
                        className="border-2 text-white"
                        type="submit"
                        onClick={(e) => handleAddress(e)}
                      >
                        Add new address
                      </Button>
                    </div>
                  </form>
                )}
                <span className="mt-5 flex justify-between">
                  <ReturnProcessBackButton />

                  <ReturnProcessNextButton />
                </span>
              </div>
            </div>
          </ReturnProcessRoot>
        </form>
      </Form>
    </>
  )
}
