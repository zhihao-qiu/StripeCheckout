import { type UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { type ColumnDef } from '@tanstack/react-table'
import type { ObjectId } from 'mongodb'

export const addressSchema = z.object({
  contact_full_name: z
    .string()
    .min(1, {
      message: 'Last name is required',
    })
    .max(60, {
      message: 'Last name must be less than 60 characters',
    }),
  contact_phone_number: z.string().min(8).max(15),
  unit_number: z
    .string()
    .max(10)
    .regex(/^[a-zA-Z0-9]*$/, {
      message: 'Please enter a valid apartment unit number',
    }),
  street: z.string().min(3).max(50),
  city: z.string().min(3).max(50),
  province: z.string().min(2).max(2),
  country: z.string().min(2).max(50),
  postal_code: z
    .string()
    .min(5)
    .max(7)
    // use regex to validate postal code
    .regex(/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/, {
      message: 'Please enter a valid postal code',
    })
    // use transform to add space between postal code
    .transform((val: string) => {
      if (val.length === 6 && typeof val[3] === 'string') {
        return val.slice(0, 3) + ' ' + val.slice(3)
      }

      return val
    }),
  instructions: z.string().min(0).optional(),
  primary: z.boolean().default(false),
})

export type Address = Omit<z.infer<typeof addressSchema>, 'instructions'> & {
  instructions?: string
  address_id: ObjectId
}

export const profileFormSchema = z.object({
  first_name: z
    .string()
    .min(1, {
      message: 'First name is required',
    })
    .max(60, {
      message: 'First name must be less than 60 characters',
    }),
  last_name: z
    .string()
    .min(1, {
      message: 'Last name is required',
    })
    .max(60, {
      message: 'Last name must be less than 60 characters',
    }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Please enter a valid email address'),
  addresses: z.array(addressSchema).optional(),
  subscription: z.string(),
  phone_number: z.string().min(8).max(15),
})

// type UserInfoBaseWithoutPrimaryAddress = Omit<
//   z.infer<typeof profileFormSchema>,
//   'primaryAddress'
// >

type UserInfoBase = Omit<z.infer<typeof profileFormSchema>, 'addresses'>

export type UserInfo = UserInfoBase & {
  addresses: Address[]
  _id: ObjectId
  payment_type: string
}

export type EditProfileFormPropsType = {
  form: UseFormReturn<{
    firstName: string
    lastName: string
    primaryAddress: {
      streetNumber: number | string
      streetName: string
      city: string
      province: string
      postal: string
      apartmentUnitNumber?: string | undefined
    }
    role: 'Admin' | 'Platinum' | 'Gold' | 'Silver' | 'Bronze'
    email: string
    additionalAddress:
      | {
          streetNumber: number | string
          streetName: string
          city: string
          province: string
          postal: string
          apartmentUnitNumber?: string | undefined
        }[]
      | undefined
  }>
  onSubmit: (values: UserInfo) => void
}

export type Mail = {
  id: string
  email: string
  message: string
  pickupAddress: Address
  deliveryAddress: Address
  retrunDate: string
  amount: number
  shippingStatus: 'Delivered' | 'In Transit' | 'Pending' | 'Error'
}

export type InboxDataTablePropsType = {
  data: Mail[]
  columns: ColumnDef<Mail>[]
}

export type ProfilePropsType = {
  userInfo: UserInfo
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
}

export const orderSchema = z.object({
  _id: z.string(),
  order_number: z.string(),
  order_date: z.object({
    $dateFromString: z.object({
      dateString: z.string(),
    }),
  }),
  order_status: z.enum([
    'Driver received',
    'Driver on the way',
    'Driver delivered to post office',
    'Delivered',
    'Cancelled',
  ]),
  order_details: z.object({
    total_cost: z.number(),
    pickup_date: z.object({
      $dateFromString: z.object({
        dateString: z.string(),
      }),
    }),
    pickup_method: z.string(),
    total_packages: z.number(),
    extra_packages_included: z.number(),
    promo_code: z.string(),
    pickup_details: z.object({
      contact_full_name: z.string(),
      contact_phone_number: z.string(),
      street: z.string(),
      unit_number: z.string(),
      city: z.string(),
      province: z.string(),
      country: z.string(),
      postal_code: z.string(),
      instructions: z.string(),
    }),
  }),
  client_details: z.object({
    first_name: z.string(),
    last_name: z.string(),
    subscription: z.string(),
    email: z.string(),
    phone_number: z.string(),
    payment_type: z.string(),
    addresses: z.array(
      z.object({
        street: z.string(),
        unit_number: z.string(),
        city: z.string(),
        province: z.string(),
        country: z.string(),
        postal_code: z.string(),
        primary: z.boolean(),
      })
    ),
  }),
  subscription_expiry_date: z.object({
    $dateFromString: z.object({
      dateString: z.string(),
    }),
  }),
})

export type Order = Omit<z.infer<typeof orderSchema>, '_id'> & {
  _id: ObjectId
  order_details: {
    pickup_details: {
      address_id: ObjectId
    }
  }
  client_details: {
    addresses: Array<{
      address_id: ObjectId
    }>
  }
}

export type ModalPropsType = {
  isOpen: boolean
  setIsOpen: () => void
}

export type LeadData = {
  fullName: string
  postalCode: string
  email: string
}

export interface Item {
  itemId: string
  itemName?: string
  quantity?: number
}

export type SubscriptionPlan = {
  name: string
  price: number
  period?: string
  total?: string
  duration?: string
  speed?: string
  support?: string
}
