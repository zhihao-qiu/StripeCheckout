import React from 'react'
import ContactForm from '@/components/ContactForm/ContactForm'
import Image from 'next/image'
import DefaultLayout from '@/layouts/DefaultLayout'

function Contact() {
  return (
    <>
      <div className="mx-auto flex max-w-lg flex-col pl-10 pt-14 md:mx-0">
        <h2 className="relative text-subtitle">
          <span className="mr-2 font-thin text-black">CONTACT</span>
          <span className="bg-gradient-to-r from-gradientL to-primary bg-clip-text font-bold text-transparent">
            US
          </span>
        </h2>
        <ContactForm />

        <input type="radio" name="" id="" />

        <Image
          className="mt-4 self-center"
          src="/images/robot.png"
          alt="Contact Us"
          width={160}
          height={160}
        />
      </div>
      <Image
        className="my-4 pl-10"
        src="/images/returnpal-short-logo.png"
        alt="Contact Us"
        width={160}
        height={0}
      />
    </>
  )
}
Contact.getLayout = (page: React.ReactElement) => {
  return (
    <DefaultLayout isHeaderShow={true} isFooterShow={false}>
      {page}
    </DefaultLayout>
  )
}

export default Contact
