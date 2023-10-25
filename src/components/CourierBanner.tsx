import React from 'react'
import Image from 'next/image'
import FedEx from './SvgComponents/PartnerLogos/FedEx'
import DHL from './SvgComponents/PartnerLogos/DHL'
import UPS from './SvgComponents/PartnerLogos/UPS'
import Purolator from './SvgComponents/PartnerLogos/Purolator'
import CanadaPost from './SvgComponents/PartnerLogos/CanadaPost'

function CourierBanner() {
  const imageContainerCSS = 'flex justify-center items-center mx-2'

  return (
    <section className="carousel flex h-[50px] min-w-[100%] max-w-[100%] items-center justify-around sm:h-[100px] lg:h-[145px]">
      <div className={`${imageContainerCSS} h-[69.3px] w-[250px]`}>
        <FedEx />
      </div>
      <div className={`${imageContainerCSS} h-[250px] w-[250px]`}>
        <DHL />
      </div>
      <div className={`${imageContainerCSS} h-[100px] w-[84.4px]`}>
        <UPS />
      </div>
      <div className={`${imageContainerCSS} h-[43.3px] w-[250px]`}>
        <Purolator />
      </div>
      <div className={`${imageContainerCSS} h-[450px] w-[300px]`}>
        <CanadaPost />
      </div>
    </section>
  )
}

export default CourierBanner
