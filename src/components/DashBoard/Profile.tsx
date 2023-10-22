'use client'

import React from 'react'

import { useState } from 'react'

import { Separator } from '@/components/ui/separator'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import DashBoardHeader from '@/components/DashBoard/DashBoardHeader'
import EditProfileForm from '@/components/DashBoard/EditProfileForm'
import { profileFormSchema, type UserInfo } from './types'
import EditAddressForm from './EditAddressForm'

function Profile() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: 'John',
    lastName: 'Doe',
    primaryAddress: {
      apartmentUnitNumber: '12A',
      streetNumber: 1234,
      streetName: 'Main St',
      city: 'Toronto',
      province: 'ON',
      postal: 'M1M1M1',
    },
    email: 'john@example.com',
    additionalAddress: [
      {
        apartmentUnitNumber: '0',
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

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      primaryAddress: userInfo.primaryAddress,
      email: userInfo.email,
      additionalAddress: userInfo.additionalAddress,
    },
  })

  const onSubmit = (values: UserInfo) => {
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
      <section className="space-y-8 p-10 text-xl">
        <h2 className="mb-4 text-largeText font-semibold">Profile</h2>

        <div className="mb-2 flex h-8 items-center gap-10">
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
            {typeof userInfo.primaryAddress.apartmentUnitNumber === 'string'
              ? '# '
              : ''}
            {userInfo.primaryAddress.apartmentUnitNumber}{' '}
            {typeof userInfo.primaryAddress.apartmentUnitNumber === 'string'
              ? '- '
              : ''}
            {userInfo.primaryAddress.streetNumber}{' '}
            {userInfo.primaryAddress.streetName}
            {', '}
            {userInfo.primaryAddress.city}
            {', '}
            {userInfo.primaryAddress.province}
            {', '} {userInfo.primaryAddress.postal}
          </span>
        </div>
        {userInfo.additionalAddress &&
        userInfo?.additionalAddress?.length > 0 ? (
          <div className="mb-2 flex gap-10">
            <label className="block">Additional Addresses:</label>
            <div className="flex flex-col">
              {userInfo.additionalAddress.map((address, index) => {
                return (
                  <EditAddressForm
                    key={`${address.streetNumber} ${index}`}
                    type="edit"
                    address={address}
                    setUserInfo={setUserInfo}
                    index={index}
                  />
                )
              })}
              {/* <Button className="w-40">Add More Address</Button> */}
              <EditAddressForm
                type="add"
                address={{
                  apartmentUnitNumber: '',
                  streetNumber: '',
                  streetName: '',
                  city: '',
                  province: '',
                  postal: '',
                }}
                setUserInfo={setUserInfo}
                index={0}
              />
            </div>
          </div>
        ) : null}
        <EditProfileForm form={form} onSubmit={onSubmit} />
      </section>
    </div>
  )
}

export default Profile
