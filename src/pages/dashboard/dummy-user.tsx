import { ObjectId } from 'mongodb'

export const dummyUser = {
  first_name: 'John',
  last_name: 'Doe',
  addresses: [
    {
      contact_full_name: 'John Doe',
      contact_phone_number: '123-456-7890',
      street: '1234 Main St ',
      unit_number: '12A',
      city: 'Toronto',
      province: 'Ontario',
      country: 'Canada',
      postal_code: 'M1M1M1',
      primary: false,
    },
  ],
  subscription: 'Platinum',
  phone_number: '123-456-7890',
  email: 'email@gmail.com',
  payment_type: 'Credit',
}
