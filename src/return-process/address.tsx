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
import Reveal from '@components/common/reveal'

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
      name: 'Bartholomew Gunderson',
      address: '6500 Boulevard de Rome, Brossard, QC, J4Y 0B6, Canada',
      default: true,
    },
    {
      name: 'Chandler Bing',
      address: '20-90 Bedford St, New York, NY 10014, USA',
      default: false,
    },
    {
      name: 'Henry Norman Bethune',
      address: '235 John Street North, Gravenhurst, Ontario P1P 1G4, Canada',
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
      //TODO: send information to backend once address is validated
      console.log(valid)
      console.log('adding new address to profile!')
      let addressString
      if (addressObj.apartmentUnitNumber) {
        addressString = `${addressObj.apartmentUnitNumber}-${addressObj.streetNumber} ${addressObj.streetName}, ${addressObj.city}, ${addressObj.province} ${addressObj.postal}`
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
    if (senderName && addressFromForm) {
      addressValidator(senderName, addressFromForm)
    }
  }

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
              <Reveal>
                <SectionHeader className="max-xxs:text-3xl">
                  Pickup Details
                </SectionHeader>
              </Reveal>
              <Reveal>
                <SectionDescription className="max-xxs:text-left max-xxs:text-sm">
                  Select or add your pickup address
                </SectionDescription>
              </Reveal>
            </ReturnProcessSection>
            <div>
              <div>
                <Reveal>
                  <div className="text-smallText font-bold text-brand max-sm:text-base sm:mt-0">
                    Your Addresses:
                  </div>
                </Reveal>
                <Reveal width="100%">
                  <Separator className="h-[0.15rem] rounded-full bg-brand sm:w-3/4" />
                </Reveal>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-3"
                        >
                          {addresses.map((address) => {
                            return (
                              <Reveal key={address.address} width="100%">
                                <FormItem className="h-15 flex w-full items-center sm:h-10">
                                  <RadioGroupItem
                                    id={address.address}
                                    value={address.address}
                                  />
                                  <Label
                                    htmlFor={address.address}
                                    className="sm:keep-all mx-6 ml-2 w-[20%] max-sm:text-xs sm:w-[18%] sm:font-bold md:pl-2 lg:mx-2 lg:w-[15%]"
                                  >
                                    {address.name}
                                  </Label>
                                  <Label
                                    htmlFor={address.address}
                                    className="break-word mx-2 my-4 w-[40%] max-w-max max-sm:text-xs sm:w-[50%] md:mx-0"
                                  >
                                    {address.address}
                                  </Label>
                                  <Label
                                    htmlFor={address.address}
                                    className="mx-2 font-bold text-primary max-sm:text-xs"
                                  >
                                    {address.default && 'Default address'}
                                  </Label>
                                </FormItem>
                              </Reveal>
                            )
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Reveal>
                  <Button
                    className="mt-4 bg-transparent font-bold text-primary hover:bg-transparent"
                    onClick={(e) => toggleAddressForm(e)}
                  >
                    + Add a new address{' '}
                  </Button>
                </Reveal>
                {addressFormVisibility && (
                  <form className="sm:flex-column justify-around sm:flex">
                    <div className="flex-column flex">
                      <div className="flex flex-row items-center ">
                        <div className="mr-5 items-center space-y-2">
                          <Reveal width="100%">
                            <div className="flex items-center">
                              <Label className="mx-2 w-1/3">Name:</Label>
                              <Input
                                type="text"
                                name="name"
                                className="my-2  w-3/4"
                                onChange={(e) => setSenderName(e.target.value)}
                              />
                            </div>
                          </Reveal>
                          <Reveal width="100%">
                            <div className="flex items-center">
                              <Label className="mx-2 w-1/3">Apt #: </Label>
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
                              <Label className="mx-2 w-1/3">Street #: </Label>
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
                          </Reveal>
                          <Reveal width="100%">
                            <div className="flex items-center">
                              <Label className="mx-2 w-1/3">
                                Street Name:{' '}
                              </Label>
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
                          </Reveal>
                          <Reveal width="100%">
                            <div className="flex items-center">
                              <Label className="mx-2 w-1/3">City: </Label>
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
                          </Reveal>
                          <Reveal width="100%">
                            <div className="flex items-center">
                              <Label className="mx-2 w-1/3">
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
                          </Reveal>
                          <Reveal width="100%">
                            <div className="flex items-center">
                              <Label className="mx-2 w-1/3">
                                Postal Code:{' '}
                              </Label>
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
                          </Reveal>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-around sm:w-1/4">
                      <Reveal>
                        <Button
                          className="break-word border-2 px-2 text-white sm:px-4"
                          type="submit"
                          onClick={(e) => handleAddress(e)}
                        >
                          Add address
                        </Button>
                      </Reveal>
                    </div>
                  </form>
                )}
                <span className="mt-5 flex justify-between">
                  <Reveal>
                    <ReturnProcessBackButton />
                  </Reveal>
                  <Reveal>
                    <ReturnProcessNextButton />
                  </Reveal>
                </span>
              </div>
            </div>
          </ReturnProcessRoot>
        </form>
      </Form>
    </>
  )
}
