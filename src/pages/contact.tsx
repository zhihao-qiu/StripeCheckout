import React from 'react'
import ContactForm from '@/components/ContactForm/ContactForm'
import Image from 'next/image'
import DefaultLayout from '@/layouts/DefaultLayout'
import Link from 'next/link'

function Contact() {
  return (
    <div className="mt-8 flex">
      <section className="mx-auto flex w-3/4 flex-col space-y-8 lg:mx-0 lg:ml-24 lg:max-w-3xl xl:max-w-5xl">
        <h2 className="text-subtitle">
          <span className="mr-2 font-thin text-brand">CONTACT</span>
          <span className="bg-gradient-to-r from-gradientL to-primary bg-clip-text font-bold text-transparent">
            US
          </span>
        </h2>
        <ContactForm />
        <Link href="/">
          <Image
            className="my-4 pl-10"
            src={'/images/returnpal-short-logo.png'}
            alt="Contact Us"
            width={160}
            height={0}
          />
        </Link>
      </section>
      <Image
        className="mx-16 hidden self-center md:mx-auto md:block"
        src="/images/robot.png"
        alt="Contact Us"
        width={160}
        height={160}
      />
    </div>
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
