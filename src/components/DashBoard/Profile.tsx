'use client'

import React from 'react'

import { Separator } from '@/components/ui/separator'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import DashBoardHeader from '@/components/DashBoard/DashBoardHeader'
import EditProfileForm from '@/components/DashBoard/EditProfileForm'
import { profileFormSchema, type UserInfo } from './types'
import EditAddressForm from '@/components/DashBoard/EditAddressForm'
import { type ProfilePropsType } from '@/components/DashBoard/types'
import Reveal from '@components/common/reveal'

function Profile({ userInfo, setUserInfo }: ProfilePropsType) {
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      primaryAddress: userInfo.primaryAddress,
      email: userInfo.email,
      role: userInfo.role,
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
    <>
      <DashBoardHeader
        firstName={userInfo.firstName}
        lastName={userInfo.lastName}
        email={userInfo.email}
      />
      <section className="flex h-[75vh] flex-col justify-between space-y-6 p-10 text-xl">
        <Reveal>
          <h2 className="mb-4 text-largeText font-semibold">Profile</h2>
        </Reveal>
        <Reveal>
          <div className="mb-2 flex h-8 items-center gap-10">
            <label className="block">First Name:</label>

            <span>{userInfo.firstName}</span>
            <Separator orientation="vertical" className="bg-brand" />
            <label className="block">Last Name:</label>

            <span>{userInfo.lastName}</span>
          </div>
        </Reveal>
        <Reveal>
          <div className="mb-2 flex gap-10">
            <label className="block">Email:</label>

            <span>{userInfo.email}</span>
          </div>
        </Reveal>
        <Reveal>
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
        </Reveal>
        {userInfo.additionalAddress &&
        userInfo?.additionalAddress?.length > 0 ? (
          <Reveal>
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
              </div>
            </div>
          </Reveal>
        ) : null}
        <div className="flex justify-between">
          <Reveal>
            <EditProfileForm form={form} onSubmit={onSubmit} />
          </Reveal>
          <Reveal>
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
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Profile
