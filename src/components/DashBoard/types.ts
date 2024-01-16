import { type UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { type ColumnDef } from '@tanstack/react-table'
import { ObjectId } from 'mongodb'

const addressSchema = z.object({
  address_id: z.instanceof(ObjectId),
  contact_full_name: z.string(),
  contact_phone_number: z.string(),
  street: z.string(),
  unit_number: z.string().optional(),
  city: z.string(),
  province: z.string().default('Ontario'),
  country: z.string().default('Canada'),
  postal_code: z.string().refine((value) => /^\w\d\w\s?\d\w\d$/.test(value), {
    message: 'Invalid postal code format',
  }),
  instructions: z.string().optional(),
  primary: z.boolean().default(false),
})
export type Address = z.infer<typeof addressSchema>

export const AddressesArraySchema = z.array(addressSchema)

export const profileFormSchema = z.object({
  _id: z.instanceof(ObjectId),
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
  subscription: z.string(),
  subscription_expiry_date: z.date().optional(),
  phone_number: z.string(),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  payment_type: z.string(),
  addresses: z.array(addressSchema),
})

export type UserInfo = z.infer<typeof profileFormSchema>

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

const PackageDetailSchema = z.object({
  attachment: z.string().optional(),
  label_type: z.string(),
  description: z.string(),
})

const PickupDetailsSchema = z.object({
  full_name: z.string(),
  phone_number: z.string(),
  street: z.string(),
  unit_number: z.string(),
  city: z.string(),
  province: z.string().default('Ontario'),
  country: z.string().default('Canada'),
  postal_code: z.string().refine((value) => /^\w\d\w\s?\d\w\d$/.test(value), {
    message: 'Invalid postal code format',
  }),
  instructions: z.string(),
  pickup_date: z.date(),
  pickup_method: z.string(),
})

const PackageDetailsArraySchema = z.array(PackageDetailSchema)

const OrderDetailsSchema = z.object({
  total_cost: z.number(),
  promo_code: z.string(),
  total_packages: z.number(),
  extra_packages_included: z.number(),
  package_details: PackageDetailsArraySchema,
  pickup_details: PickupDetailsSchema,
})

const ClientDetailsSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  subscription: z.string(),
  subscription_expiry_date: z.date().optional(),
  email: z.string(),
  phone_number: z.string(),
  payment_type: z.string(),
  addresses: AddressesArraySchema,
})

const OrdersCollectionSchema = z.object({
  _id: z.instanceof(ObjectId),
  order_number: z.string(), // System-generated
  order_date: z.date(),
  status: z.enum([
    'Driver received',
    'Driver on the way',
    'Driver delivered to post office',
    'Delivered',
    'Cancelled',
  ]),
  order_details: OrderDetailsSchema,
  client_details: ClientDetailsSchema,
})
export type Order = z.infer<typeof OrdersCollectionSchema>

export type ModalPropsType = {
  isOpen: boolean
  setIsOpen: () => void
}
export type LeadData = {
  fullName: string
  postalCode: string
  email: string
}

export interface ConfirmationDialogProps {
  message: string
  onCancel: () => void
  onConfirm: () => void
  orderId: ObjectId
}

export interface PaginatedResponse {
  paginatedOrders: Order[]
  currentPage: number
  totalPages: number
  totalOrders: number
}
