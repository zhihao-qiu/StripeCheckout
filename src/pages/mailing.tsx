import React from 'react'
import Image from 'next/image'
import DefaultLayout from '@/layouts/DefaultLayout'
import Reveal from '@components/common/reveal'
import MailingForm from '@components/MailingForm/MailingForm'


function Mailing() {
  
  return (
    <div className="mx-auto mt-8 flex w-11/12 justify-end sm:mx-0 sm:w-5/6 sm:justify-end md:w-3/4 lg:w-1/2">
      <section className="flex w-full flex-col space-y-8 sm:w-5/6">
        <Reveal>
          <h2 className="text-subtitle">
            <span className="mr-2 font-thin text-brand">MAILING</span>
            <span className="bg-gradient-to-r from-gradientL to-primary bg-clip-text font-bold text-transparent">
              LIST
            </span>
          </h2>
          <p>You'll be the first to know when ReturnPal is serving your area!</p>
        </Reveal>
        <MailingForm />
        <Reveal width="100%">
          <Image
            className="mx-16 mb-6 hidden self-center md:mx-auto md:block"
            src="/images/robot.png"
            alt="Mailing List"
            width={240}
            height={240}
          />
        </Reveal>
        {/* <Link href="/">
          <Reveal>
            <Image
              className="my-4 pl-10"
              src={'/images/returnpal-short-logo.png'}
              alt="Contact Us"
              width={160}
              height={0}
            />
          </Reveal>
        </Link> */}
      </section>
    </div>
  )
}
Mailing.getLayout = (page: React.ReactElement) => {
  return (
    <DefaultLayout isHeaderShow={true} isFooterShow={true}>
      {page}
    </DefaultLayout>
  )
}

export default Mailing
