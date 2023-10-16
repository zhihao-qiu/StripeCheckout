import React from 'react'
import Image from 'next/image'

function PartnerBanner() {
  return (
    <section className="my-20 flex h-32 w-full gap-12 overflow-x-scroll bg-primary xl:h-36 xl:justify-around xl:gap-6 xl:overflow-auto">
      <Image
        src="/images/amazon.png"
        className="px-4 py-2"
        alt="amazon"
        width={300}
        height={100}
      />
      <Image
        className="px-8 py-12 lg:px-16"
        src="/images/walmart.png"
        alt="walmart"
        width={320}
        height={150}
      />
      <Image
        className="w-32 py-8"
        src="/images/homedepot.png"
        alt="homedepot"
        width={100}
        height={100}
      />
      <Image
        src="/images/costco.png"
        className="p-10 lg:px-16"
        alt="costco"
        width={300}
        height={100}
      />
      <Image
        src="/images/nike.png"
        className="p-8"
        alt="nike"
        width={200}
        height={100}
      />
    </section>
  )
}

export default PartnerBanner
