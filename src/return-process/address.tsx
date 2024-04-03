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
import {
  type Address,
  addressSchema,
  UserInfo,
} from '@/components/DashBoard/types'
import { SectionDescription, SectionHeader } from '@/components/common/section'
import Reveal from '@components/common/reveal'
import { config } from 'dotenv'

const formSchema = z.object({
  deliveryAddress: z.string().min(1),
})

export default function Address() {
  const [addresses, setAddresses] = useState<Address[]>([])

  const [addressFormVisibility, setAddressFormVisiblity] = useState(false)
  const [addressFromForm, setAddressFromForm] =
    useState<Partial<Address> | null>()
  const { toast } = useToast()
  const returnProcess = useReturnProcess()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryAddress: returnProcess.currentData.address_id?.toString(),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedAddress = addresses.find(
      (address) => address.address_id?.toString() === values.deliveryAddress
    )

    returnProcess.setCurrentData({
      contact_full_name: selectedAddress?.contact_full_name,
      contact_phone_number: selectedAddress?.contact_phone_number,
      street: selectedAddress?.street,
      unit_number: selectedAddress?.unit_number,
      city: selectedAddress?.city,
      province: selectedAddress?.province,
      country: selectedAddress?.country,
      postal_code: selectedAddress?.postal_code,
      instructions: selectedAddress?.instructions,
    })
    returnProcess.forward()
  }

  useEffect(() => {
    console.log(returnProcess.currentData.userInfo)

    setAddresses(returnProcess.currentData.userInfo.addresses)
  }, [])

  const validateFormData = (inputs: unknown) => {
    const isValidData = addressSchema.parse(inputs)
    return isValidData
  }

  const addressValidator = (newAddress: Partial<Address>) => {
    try {
      const valid = validateFormData(newAddress)
      if (!valid) {
        return
      }

      interface AddressResponse {
        message: string
        newUserInfo: UserInfo
      }

      // send information to backend once address is validated
      fetch(`/api/users`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: returnProcess.currentData.userInfo._id,
          address: newAddress,
        }),
      })
        .then((response) => response.json())
        .then((data: AddressResponse) => {
          returnProcess.setCurrentData({ userInfo: data.newUserInfo })
          setAddresses(data.newUserInfo.addresses)
          setAddressFromForm(null)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    } catch (err: unknown) {
      console.log(err)
      toast({
        variant: 'destructive',
        description:
          'Please ensure that all fields are filled in, province field contains only two letters, and postal code is correct',
      })
    }
  }

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
    if (addressFromForm) {
      addressValidator(addressFromForm)
      setAddressFormVisiblity(!addressFormVisibility)
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
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-3"
                        >
                          {addresses.map((address) => {
                            const deliveryAddress = address.unit_number
                              ? `${address.unit_number}-${address.street}, ${address.city}, ${address.province}, ${address.country} ${address.postal_code}`
                              : `${address.street}, ${address.city}, ${address.province}, ${address.country} ${address.postal_code}`

                            return (
                              <Reveal key={address.address_id} width="100%">
                                <FormItem className="h-15 flex w-full items-center sm:h-10">
                                  <RadioGroupItem
                                    id={address.address_id}
                                    value={address.address_id!}
                                  />
                                  <Label
                                    htmlFor={address.address_id}
                                    className="sm:keep-all mx-6 ml-2 w-[20%] max-sm:text-xs sm:w-[18%] sm:font-bold md:pl-2 lg:mx-2 lg:w-[15%]"
                                  >
                                    {address.contact_full_name}
                                  </Label>
                                  <Label
                                    htmlFor={address.address_id}
                                    className="break-word mx-2 my-4 w-[40%] max-w-max max-sm:text-xs sm:w-[50%] md:mx-0"
                                  >
                                    {deliveryAddress}
                                  </Label>
                                  <Label
                                    htmlFor={address.address_id}
                                    className="sm:keep-all mx-6 ml-2 w-[20%] max-sm:text-xs sm:w-[18%] sm:font-bold md:pl-2 lg:mx-2 lg:w-[15%]"
                                  >
                                    {address.instructions &&
                                      address.instructions}
                                  </Label>
                                  <Label
                                    htmlFor={address.address_id}
                                    className="mx-2 font-bold text-primary max-sm:text-xs"
                                  >
                                    {address.primary && 'Default address'}
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
                                name="address"
                                className="my-2  w-3/4"
                                onChange={(e) =>
                                  setAddressFromForm({
                                    ...addressFromForm,
                                    contact_full_name: e.target.value,
                                  } as Address)
                                }
                              />
                            </div>
                          </Reveal>
                          <Reveal width="100%">
                            <div className="flex items-center">
                              <Label className="mx-2 w-1/3">Phone #:</Label>
                              <Input
                                type="text"
                                name="address"
                                className="my-2  w-3/4"
                                onChange={(e) =>
                                  setAddressFromForm({
                                    ...addressFromForm,
                                    contact_phone_number: e.target.value,
                                  } as Address)
                                }
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
                                    unit_number: e.target.value,
                                  } as Address)
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
                                    street: e.target.value,
                                  } as Address)
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
                                  } as Address)
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
                                  } as Address)
                                }
                              />
                            </div>
                          </Reveal>
                          <Reveal width="100%">
                            <div className="flex items-center">
                              <Label className="mx-2 w-1/3">Country: </Label>
                              <Input
                                type="text"
                                name="address"
                                className="my-2  w-3/4"
                                onChange={(e) =>
                                  setAddressFromForm({
                                    ...addressFromForm,
                                    country: e.target.value,
                                  } as Address)
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
                                    postal_code: e.target.value,
                                  } as Address)
                                }
                              />
                            </div>
                          </Reveal>
                          <Reveal width="100%">
                            <div className="flex items-center">
                              <Label className="mx-2 w-1/3">
                                Instructions:{' '}
                              </Label>
                              <Input
                                type="text"
                                name="address"
                                className="my-2  w-3/4"
                                onChange={(e) =>
                                  setAddressFromForm({
                                    ...addressFromForm,
                                    instructions: e.target.value,
                                  } as Address)
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
