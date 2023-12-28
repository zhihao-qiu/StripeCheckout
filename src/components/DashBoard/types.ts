import { type UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { type ColumnDef } from '@tanstack/react-table'

export const addressSchema = z.object({
  apartmentUnitNumber: z
    .string()
    .min(1)
    .max(10)
    .regex(/^[a-zA-Z0-9]*$/, {
      message: 'Please enter a valid apartment unit number',
    })
    .optional(),
  streetNumber: z.coerce
    .number()
    .min(1, {
      message: 'Please enter a valid number',
    })
    .max(999999, {
      message: 'Please enter a valid number',
    }),
  streetName: z.string().min(3).max(50),
  city: z.string().min(3).max(50),
  province: z.string().min(2).max(2),
  postal: z
    .string()
    .min(6)
    .max(7)
    .regex(/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/, {
      message: 'Please enter a valid postal code',
    })
    .transform((val: string) => {
      if (val.length === 6 && typeof val[3] === 'string') {
        return val.slice(0, 3) + ' ' + val.slice(3)
      }

      return val
    }),
})

export type Address = Omit<z.infer<typeof addressSchema>, 'streetNumber'> & {
  streetNumber: string | number
}

export const profileFormSchema = z.object({
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
  role: z.enum(['Admin', 'Platinum', 'Gold', 'Silver', 'Bronze']),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  additionalAddress: z.array(addressSchema).optional(),
})

type UserInfoBaseWithoutPrimaryAddress = Omit<
  z.infer<typeof profileFormSchema>,
  'primaryAddress'
>

type UserInfoBase = Omit<UserInfoBaseWithoutPrimaryAddress, 'additionalAddress'>

export type UserInfo = UserInfoBase & {
  primaryAddress: Address
  additionalAddress?: Address[]
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
  itemName: z.string(),
  quantity: z.number(),
  price: z.number(),
  customerName: z.string(),
  customerPhoneNumber: z.string(),
  deliveryAddress: z.string(),
  orderNumber: z.string(),
  dateAndTime: z.string(),
  deliveryOption: z.string(),
  packageOrderType: z.string(),
  labelType: z.string(),
  paymentMethod: z.string(),
  promoCode: z.string(),
  upgradeOption: z.string(),
  specialInstructions: z.string().optional(),
  status: z.enum([
    'Driver received',
    'Driver on the way',
    'Driver delivered to post office',
    'Delivered',
    'Cancelled',
  ]),
  subscription_expiry_date: z.date(),
  address_id: z.string().optional(),
})

export type Order = Omit<z.infer<typeof orderSchema>, '_id'> & { _id?: string }
