import { type UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { type ColumnDef } from '@tanstack/react-table'
import { ObjectId } from 'mongodb'

export const addressSchema = z.object({
  contact_full_name: z.string().min(3).max(50),
  unitNumber: z
    .string()
    .max(10)
    .regex(/^[a-zA-Z0-9]*$/, {
      message: 'Please enter a valid apartment unit number',
    })
    .optional(),
  // streetNumber: z.coerce
  //   .number()
  //   .min(1, {
  //     message: 'Please enter a valid number',
  //   })
  //   .max(999999, {
  //     message: 'Please enter a valid number',
  //   }),
  street: z.string().min(3).max(50),
  city: z.string().min(3).max(50),
  province: z.string().min(2).max(2),
  country: z.string().min(2).max(50),
  postalCode: z
    .string()
    .min(6)
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
  instructions: z.string().min(0),
  primary: z.boolean().default(false),
})

export type Address = Omit<z.infer<typeof addressSchema>, 'instructions'> & {
  instructions?: string
  addressId: ObjectId
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
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Please enter a valid email address'),
  addresses: z.array(addressSchema).optional(),
  subscription: z.enum(['Admin', 'Platinum', 'Gold', 'Silver', 'Bronze']),
})

// type UserInfoBaseWithoutPrimaryAddress = Omit<
//   z.infer<typeof profileFormSchema>,
//   'primaryAddress'
// >

type UserInfoBase = Omit<z.infer<typeof profileFormSchema>, 'addresses'>

export type UserInfo = UserInfoBase & {
  addresses?: Address[]
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

export type OrderStatus =
  | 'Driver received'
  | 'Driver on the way'
  | 'Driver delivered to post office'
  | 'Delivered'
  | 'Cancelled'

export interface Order {
  items: Item[]
  price?: number
  customerName: string
  customerPhoneNumber?: string
  deliveryAddress: string
  orderNumber?: string
  dateAndTime: string
  deliveryOption: string
  packageOrderType: string
  labelType?: string
  paymentMethod: string
  promoCode: string
  upgradeOption: string
  specialInstructions?: string
  status: OrderStatus
}

export interface Item {
  itemId: string
  itemName?: string
  quantity?: number
}