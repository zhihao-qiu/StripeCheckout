'use client'

import React, { useRef } from 'react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import DashBoardHeader from './DashBoardHeader'

const inputNumberSchema = z
  .union([
    z
      .number()
      .min(1, {
        message: 'Please enter a valid number',
      })
      .max(999999, {
        message: 'Please enter a valid number',
      }),
    z.string(),
  ])
  .transform((value) => {
    if (typeof value === 'string') {
      const parsedNumber = parseInt(value, 10)
      return isNaN(parsedNumber) ? 0 : parsedNumber
    }
    return value
  })

const addressSchema = z.object({
  apartmentUnitNumber: inputNumberSchema.optional(),
  streetNumber: inputNumberSchema,
  streetName: z.string().min(3).max(50),
  city: z.string().min(3).max(50),
  province: z.string().min(2).max(2),
  postal: z
    .string()
    .min(6)
    .max(6)
    .regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, {
      message: 'Please enter a valid postal code',
    }),
})

// type Address = z.infer<typeof addressSchema>

// type Address = {
//   apartmentUnitNumber?: number
//   streetNumber: number
//   streetName: string
//   city: string
//   province: string
//   postal: string
// }

// type UserInfo = {
//   firstName: string
//   lastName: string
//   primaryAddress: Address
//   email: string
//   addtionalAddress?: Address[]
// }

const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: 'First name is required',
    })
    .max(60, {
      message: 'First name must be less than 60 characters',
    }),
  lastName: z
    .string()
    .min(1, {
      message: 'Last name is required',
    })
    .max(60, {
      message: 'Last name must be less than 60 characters',
    }),
  primaryAddress: addressSchema,
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  addtionalAddress: z.array(addressSchema).optional(),
})

type UserInfo = z.infer<typeof profileFormSchema>

function Profile() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: 'John',
    lastName: 'Doe',
    primaryAddress: {
      apartmentUnitNumber: 12,
      streetNumber: 1234,
      streetName: 'Main St',
      city: 'Toronto',
      province: 'ON',
      postal: 'M1M1M1',
    },
    email: 'john@example.com',
    addtionalAddress: [
      {
        apartmentUnitNumber: 13,
        streetNumber: 999,
        streetName: 'Main St',
        city: 'Toronto',
        province: 'ON',
        postal: 'M1M1M1',
      },
      {
        streetNumber: 123,
        streetName: 'Main St',
        city: 'Toronto',
        province: 'ON',
        postal: 'M1M1M1',
      },
    ],
  })

  const formRef = useRef<HTMLFormElement>(null)

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      primaryAddress: userInfo.primaryAddress,
      email: userInfo.email,
      additionalAddress: userInfo.addtionalAddress,
    },
  })

  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    console.log(values)

    setUserInfo((prev) => {
      return {
        ...prev,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        primaryAddress: values.primaryAddress,
      }
    })
  }

  return (
    <div className="w-full text-brand">
      <DashBoardHeader
        firstName={userInfo.firstName}
        lastName={userInfo.lastName}
        email={userInfo.email}
      />
      <section className="space-y-12 p-10 text-xl">
        <h2 className="mb-4 text-largeText font-semibold">Profile</h2>

        <div className="mb-2 flex h-4 items-center gap-10">
          <label className="block">First Name:</label>

          <span>{userInfo.firstName}</span>
          <Separator orientation="vertical" className="bg-brand" />
          <label className="block">Last Name:</label>

          <span>{userInfo.lastName}</span>
        </div>
        <Separator orientation="vertical" className="bg-brand" />
        <div className="mb-2 flex gap-10">
          <label className="block">Email:</label>

          <span>{userInfo.email}</span>
        </div>

        <div className="mb-2 flex gap-10">
          <label className="block">Primary Address:</label>

          <span>
            {typeof userInfo.primaryAddress.apartmentUnitNumber === 'number'
              ? '# '
              : ''}
            {userInfo.primaryAddress.apartmentUnitNumber}{' '}
            {typeof userInfo.primaryAddress.apartmentUnitNumber === 'number'
              ? '- '
              : ''}
            {userInfo.primaryAddress.streetNumber}{' '}
            {userInfo.primaryAddress.streetName} {userInfo.primaryAddress.city}{' '}
            {userInfo.primaryAddress.province} {userInfo.primaryAddress.postal}
          </span>
        </div>
        {userInfo.addtionalAddress && userInfo?.addtionalAddress?.length > 0 ? (
          <div className="mb-2 flex gap-10">
            <label className="block">Additional Addresses:</label>
            <div className="flex flex-col">
              {userInfo.addtionalAddress.map((address, index) => (
                <span key={index}>
                  {address.apartmentUnitNumber ? '# ' : ''}
                  {address.apartmentUnitNumber}{' '}
                  {address.apartmentUnitNumber ? '- ' : ''}
                  {address.streetNumber} {address.streetName} {address.city}{' '}
                  {address.province} {address.postal}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <Form {...form}>
              {/* TODO figure out api call for user profile update */}
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you are
                    done.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex w-full flex-col">
                  <div className="flex gap-8">
                    <div className="flex flex-1 flex-col">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-right">
                              First Name
                            </FormLabel>
                            <FormControl>
                              <Input id="firstName" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-right">
                              Last Name
                            </FormLabel>
                            <FormControl>
                              <Input id="lastName" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">Email</FormLabel>
                          <FormControl>
                            <Input id="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex gap-8">
                    <div className="flex flex-1 flex-col">
                      <FormField
                        control={form.control}
                        name="primaryAddress.apartmentUnitNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-right">
                              Apartment or Unit Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="apartmentUnitNumber"
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <FormField
                        control={form.control}
                        name="primaryAddress.streetNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-right">
                              Street Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="streetNumber"
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <FormField
                      control={form.control}
                      name="primaryAddress.streetName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">
                            Street Name
                          </FormLabel>
                          <FormControl>
                            <Input id="streetName" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <FormField
                      control={form.control}
                      name="primaryAddress.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">City</FormLabel>
                          <FormControl>
                            <Input id="city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <FormField
                      control={form.control}
                      name="primaryAddress.province"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">Province</FormLabel>
                          <FormControl>
                            <Input id="province" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <FormField
                      control={form.control}
                      name="primaryAddress.postal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">Postal</FormLabel>
                          <FormControl>
                            <Input id="postal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      onClick={() => {
                        if (formRef.current) {
                          formRef.current.dispatchEvent(
                            new Event('submit', { bubbles: true })
                          )
                        }
                      }}
                    >
                      Save changes
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <Button type="submit"> Submit</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}

export default Profile
