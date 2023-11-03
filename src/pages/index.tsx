import React from 'react'
import Image from 'next/image'
import { getLayout } from '@/layouts/DefaultLayout'
import { Button } from '@/components/ui/button'
import HomePageSVG from '@/components/SvgComponents/HomePageSVG'
import DemoCards from '@/components/DemoCards/DemoCards'
import CourierBanner from '@/components/CourierBanner'
import PartnerBanner from '@/components/PartnerBanner'
import Link from 'next/link'
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionHeaderHighlight,
} from '@/components/common/section'
import Faq from '@components/Faq'
import Reveal from '@components/common/reveal'

function Home() {
  return (
    <>
      <div className="container mx-auto flex max-w-5xl pb-16 pt-12 md:pt-20 xl:max-w-7xl">
        <div className="w-full space-y-8 px-4 sm:px-3 xl:space-y-12">
          <section className="flex gap-4">
            <Section className="flex-1">
              <Reveal>
                <SectionHeader className="font-medium xl:text-title">
                  Return Your Package The{' '}
                  <SectionHeaderHighlight>Easy Way</SectionHeaderHighlight>
                </SectionHeader>
              </Reveal>
              <SectionDescription className="px-10 text-start text-sm sm:text-base md:px-0 lg:text-lg">
                <Reveal>
                  <p>
                    We handle returns of purchases from all online retailers. No
                    need for printing labels, packaging, or visits to the post
                    office.
                  </p>
                </Reveal>
              </SectionDescription>
              <Link href="/return" className=" self-start justify-self-center">
                <Reveal>
                  <Button className="h-7 text-sm lg:h-9 lg:text-base xl:h-12 xl:text-lg">
                    Schedule a Pickup Now
                  </Button>
                </Reveal>
              </Link>
            </Section>
            <div className="hidden flex-1 md:block">
              <Reveal width="100%">
                <div className="flex items-center justify-center">
                  <div className="md:h-[250px] lg:h-[334px]">
                    <Image
                      src="/images/pexels-norma-mortenson.png"
                      alt="Return Pal"
                      priority={true}
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{ width: 'auto', height: '100%' }}
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
          <section className="m-[calc(-50vw+50%)] transition-all duration-200">
            <div className="relative">
              <HomePageSVG />
              <DemoCards />
            </div>
          </section>
          <section className="flex flex-col items-center gap-8">
            <Reveal>
              <h3 className="font-semibold md:text-2xl lg:text-3xl xl:text-5xl">
                We Accept <span className="text-primary">Any</span> Retailer{' '}
                <span className="text-primary">Any</span> Time
              </h3>
            </Reveal>
            <Reveal>
              <Image
                className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                src="/images/women_checking_order_process.png"
                alt="checking order process"
                width={890}
                height={500}
              />
            </Reveal>
            <Reveal>
              <article className="max-w-lg text-center text-base text-brand  sm:text-lg md:text-2xl lg:max-w-7xl lg:text-3xl  xl:text-5xl">
                We accept all online retailers with just a click of a button.
                Return all your packages without the hassle.
              </article>
            </Reveal>
          </section>
        </div>
      </div>
      <div className="carousel-container min-w-screen relative mx-0 flex overflow-hidden whitespace-nowrap bg-[#008BE7] px-0 py-0 before:w-[25px] after:w-[25px] sm:before:w-[75px] sm:after:w-[75px] md:before:w-[150px] md:after:w-[150px]">
        <PartnerBanner />
        <PartnerBanner />
      </div>

      <div className="container mx-auto flex max-w-5xl pb-16 pt-12 md:pt-20 xl:max-w-7xl">
        <div className="w-full space-y-8 px-4 sm:px-3 xl:space-y-12">
          <section className="flex flex-col items-center gap-8">
            <Reveal>
              <h3 className="font-semibold md:text-2xl lg:text-3xl xl:text-5xl">
                Return made <span className="text-primary">Easy</span>
              </h3>
            </Reveal>
            <Reveal>
              <Image
                className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                src="/images/np_smiling_delivery_man.png"
                alt="checking order process"
                width={890}
                height={500}
              />
            </Reveal>
            <Reveal>
              <article className="max-w-lg text-center text-base  text-brand sm:text-lg md:text-2xl lg:max-w-7xl lg:text-3xl  xl:text-5xl">
                Your scheduled pickup is retrieved by us right from your door
                and on its way to an assigned courier.
              </article>
            </Reveal>
          </section>
        </div>
      </div>
      <div className="delivery-container min-w-screen relative mx-0 flex overflow-hidden whitespace-nowrap bg-[#FFFFFF] px-0 py-0 before:w-[25px] after:w-[25px] sm:before:w-[75px] sm:after:w-[75px] md:before:w-[150px] md:after:w-[150px]">
        <CourierBanner />
        <CourierBanner />
      </div>
      <section className="flex h-[68rem] w-full flex-col items-center justify-around bg-brand lg:h-[72rem]">
        <Reveal>
          <h3 className="text-center text-largeText text-white md:text-subtitle">
            FAQs
          </h3>
        </Reveal>
        <Faq />
        <Reveal>
          <Link href="/contact">
            <Button className="md:h16 h-12 w-48 self-center text-sm md:w-80 lg:text-mediumText">
              Contact Us
            </Button>
          </Link>
        </Reveal>
      </section>
    </>
  )
}

export default Home

Home.getLayout = getLayout
