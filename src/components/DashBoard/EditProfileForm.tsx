import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type EditProfileFormPropsType } from '@/components/DashBoard/types'
import { ProvincesSelector } from './ProvincesSelector'

function EditProfileForm({ form, onSubmit }: EditProfileFormPropsType) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <Form {...form}>
          {/* TODO figure out api call for user profile update */}
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          {/* <form onSubmit={form.handleSubmit(onSubmit)}> */}
          <form>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you are done.
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
                        <FormLabel className="text-right">First Name</FormLabel>
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
                        <FormLabel className="text-right">Last Name</FormLabel>
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
                          Apartment or Unit Number if applicable
                        </FormLabel>
                        <FormControl>
                          <Input id="apartmentUnitNumber" {...field} />
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
                          <Input id="streetNumber" type="number" {...field} />
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
                      <FormLabel className="text-right">Street Name</FormLabel>
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
                        {/* <Input id="province" {...field} /> */}
                        <ProvincesSelector
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        />
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
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileForm
