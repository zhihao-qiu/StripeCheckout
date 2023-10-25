import Amazon from './SvgComponents/PartnerLogos/Amazon'
import Costco from './SvgComponents/PartnerLogos/Costco'
import HomeDepot from './SvgComponents/PartnerLogos/HomeDepot'
import Nike from './SvgComponents/PartnerLogos/Nike'
import Walmart from './SvgComponents/PartnerLogos/Walmart'

function PartnerBanner() {
  const imageContainerCSS = 'flex justify-center items-center mx-2'

  return (
    <section className="carousel flex h-[50px] min-w-[100%] max-w-[100%] items-center justify-around sm:h-[100px] lg:h-[145px]">
      <div className={`${imageContainerCSS} mt-1 h-[47.449px] w-[225px]`}>
        <Amazon />
      </div>
      <div className={`${imageContainerCSS} mb-2 h-[59.4px] w-[250px]`}>
        <Walmart />
      </div>
      <div className={`${imageContainerCSS} h-[120px] w-[120px]`}>
        <HomeDepot />
      </div>
      <div className={`${imageContainerCSS} mb-2 h-[91.5px] w-[256px]`}>
        <Costco />
      </div>
      <div className={`${imageContainerCSS} h-[150px] w-[150px]`}>
        <Nike />
      </div>
    </section>
  )
}

export default PartnerBanner
