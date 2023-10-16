import React from 'react'
import Image from 'next/image'

function CourierBanner() {
  return (
    <section className="mt-20 flex h-32 w-full gap-12 overflow-x-scroll bg-white xl:h-36 xl:justify-around xl:gap-6 xl:overflow-auto">
      <Image
        src="/images/fedex.png"
        className="p-10"
        alt="fedex"
        width={300}
        height={100}
      />
      <Image
        src="/images/dhl.png"
        className="p-10"
        alt="dhl"
        width={300}
        height={100}
      />
      <Image
        src="/images/ups.png"
        className="px-6 py-8 lg:px-8 xl:px-14 2xl:px-16"
        alt="ups"
        width={200}
        height={270}
      />
      <Image
        src="/images/purolator.png"
        className="p-10"
        alt="purolator"
        width={300}
        height={100}
      />
      <Image
        src="/images/canada_post.png"
        alt="canada post"
        className="p-10"
        width={300}
        height={100}
      />
    </section>
  )
}

export default CourierBanner
