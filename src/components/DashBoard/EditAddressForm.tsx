import React from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type Address,
  addressSchema,
  type UserInfo,
} from '@/components/DashBoard/types'
import { ProvincesSelector } from './ProvincesSelector'

function EditAddressForm({
  address,
  index,
  setUserInfo,
  type,
}: {
  address: Address
  index?: number
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
  type: 'edit' | 'add'
}) {
  const addressForm = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      unitNumber: address.unit_number,
      // streetNumber: address.streetNumber,
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postalCode: address.postal_code,
    },
  })

  // const onSubmit = (values: Address) => {
  //   setUserInfo((prev) => ({
  //     ...prev,
  //     additionalAddress: prev.additionalAddress
  //       ? prev.additionalAddress.map((item, i) => (i === index ? values : item))
  //       : undefined,
  //   }))
  // }

  // const onCreate = (values: Address) => {
  //   setUserInfo((prev) => ({
  //     ...prev,
  //     additionalAddress: prev.additionalAddress
  //       ? [...prev.additionalAddress, values]
  //       : undefined,
  //   }))
  // }

  // const onClickDelete = () => {
  //   setUserInfo((prev) => {
  //     return {
  //       ...prev,
  //       additionalAddress: prev.additionalAddress
  //         ? prev.additionalAddress.filter((_, i) => i !== index)
  //         : undefined,
  //     }
  //   })
  // }

  return (
    <div
      key={address.street}
      className="flex items-center justify-between gap-32"
    >
      {/* {' '}
      {type === 'edit' ? (
        <span>
          {typeof address.unitNumber === 'string' ? '# ' : ''}
          {address.unitNumber}{' '}
          {typeof address.unitNumber === 'string' ? '- ' : ''}
          {address.street}
          {', '} {address.city}
          {', '} {address.province}
          {', '} {address.country}
          {', '} {address.postalCode}
        </span>
      ) : null}
      <span className="flex gap-4">
        <Dialog>
          <DialogTrigger asChild>
            {type === 'edit' ? (
              <Button variant="ghost">
                <BiEditAlt />
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => addressForm.reset()}>
                Create New Address
              </Button>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <Form {...addressForm}>
              <form
                // eslint-disable-next-line
                onSubmit={addressForm.handleSubmit(
                  type === 'edit' ? onSubmit : onCreate
                )}
              >
                <div className="flex flex-col">
                  <FormField
                    control={addressForm.control}
                    name="unitNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right">
                          Apartment/Unit Number
                        </FormLabel>
                        <FormControl>
                          <Input id="unitNumber" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  <FormField
                    control={addressForm.control}
                    name="streetNumber"
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
                <div className="flex flex-col">
                  <FormField
                    control={addressForm.control}
                    name="streetName"
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
                    control={addressForm.control}
                    name="city"
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
                    control={addressForm.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right">Province</FormLabel>
                        <FormControl>
                          <ProvincesSelector
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  <FormField
                    control={addressForm.control}
                    name="postal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right">
                          Postal Code
                        </FormLabel>
                        <FormControl>
                          <Input id="postal" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="submit">Save</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        {type === 'edit' ? (
          <Button variant="ghost">
            <MdOutlineDeleteOutline onClick={onClickDelete} />
          </Button>
        ) : null}
      </span> */}
    </div>
  )
}

export default EditAddressForm
