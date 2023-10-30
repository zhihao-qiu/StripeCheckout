import {
  HomeSectionImage,
  HomeSectionImageRoot,
  HomeSectionImageTitle,
  HomeSectionImageTitleDescription,
  HomeSectionImageTitleHeader,
} from '@/components/common/home'
import { getLayout } from '@/layouts/DefaultLayout'

import hasanFounderImage from '@images/Hasan-cropped_founder.jpg'
import alamdarFounderImage from '@images/Alamdar-cropped_founder.jpg'

import Earth from '@/components/SvgComponents/Earth'
import People from '@/components/SvgComponents/People'
import Hands from '@/components/SvgComponents/Hands'
import Toronto from '@/components/SvgComponents/Toronto'
import OurFoundersBackground from '@/components/SvgComponents/OurFoundersBackground'
import WhyChooseUsBackground from '@/components/SvgComponents/WhyChooseUsBackground'
import {
  Section,
  SectionBackground,
  SectionBackgroundAbsolute,
  SectionBackgroundContent,
  SectionDescription,
  SectionHeader,
  SectionHeaderHighlight,
} from '@/components/common/section'

export default function AboutUs() {
  return (
    <div className="container mx-auto flex max-w-5xl pb-16 pt-20">
      <div className="w-full space-y-16">
        <Section>
          <SectionHeader className="text-center">
            How <SectionHeaderHighlight>ReturnPal</SectionHeaderHighlight> Began
          </SectionHeader>
          <SectionDescription className="md:w-4/6">
            ReturnPal was born out of a simple realization: the traditional
            process of returning online purchases is far too complicated. Two
            brothers after waiting in line at the post office, decided there had
            to be a better way. Thus, ReturnPal was created to streamline
            returns for both consumers and businesses, while also making a
            positive impact on the community.
          </SectionDescription>
        </Section>

        <SectionBackground>
          <SectionBackgroundContent>
            <OurFoundersBackground className="h-[60rem] w-screen fill-brand md:h-[45rem]" />

            <SectionBackgroundAbsolute>
              <Section className="container mx-auto max-w-5xl space-y-6 text-white">
                <SectionHeader className="text-center">
                  Our <SectionHeaderHighlight>Founders</SectionHeaderHighlight>
                </SectionHeader>
                <div className="grid w-full place-items-center gap-7 md:flex md:grid-cols-2 md:justify-between md:px-9">
                  <HomeSectionImageRoot>
                    <HomeSectionImage
                      className="h-52 w-52 md:h-72 md:w-72"
                      src={hasanFounderImage}
                      priority
                      alt="CEO of Returnpal of ReturnPal Hasan-Ali Abidi"
                    />
                    <HomeSectionImageTitle className="text-center">
                      <HomeSectionImageTitleHeader>
                        Hasan-Ali Abidi
                      </HomeSectionImageTitleHeader>
                      <HomeSectionImageTitleDescription>
                        CEO of Returnpal
                      </HomeSectionImageTitleDescription>
                    </HomeSectionImageTitle>
                  </HomeSectionImageRoot>

                  <HomeSectionImageRoot>
                    <HomeSectionImage
                      className="h-52 w-52 md:h-72 md:w-72"
                      src={alamdarFounderImage}
                      priority
                      alt="Co-Founder of ReturnPal Alamdar-Ali Abidi"
                    />
                    <HomeSectionImageTitle className="text-center">
                      <HomeSectionImageTitleHeader>
                        Alamdar-Ali Abidi
                      </HomeSectionImageTitleHeader>
                      <HomeSectionImageTitleDescription>
                        Co-Founder of ReturnPal
                      </HomeSectionImageTitleDescription>
                    </HomeSectionImageTitle>
                  </HomeSectionImageRoot>
                </div>
              </Section>
            </SectionBackgroundAbsolute>
          </SectionBackgroundContent>
        </SectionBackground>

        <Section>
          <SectionHeader>
            Our <SectionHeaderHighlight>Mission</SectionHeaderHighlight>
          </SectionHeader>
          <SectionDescription className="md:w-4/6">
            Our goal is to revolutionize the returns process for online shoppers
            by offering a hassle-free and convenient solution. We aim to
            alleviate the stress of the return process by managing the entire
            repackaging and delivery process on your behalf, allowing you to sit
            back and relax.
          </SectionDescription>
        </Section>

        <SectionBackground>
          <SectionBackgroundContent>
            <WhyChooseUsBackground className="h-[45rem] w-screen fill-brand" />

            <SectionBackgroundAbsolute>
              <Section className="container mx-auto max-w-5xl space-y-6 text-white">
                <SectionHeader>
                  Why Choose <SectionHeaderHighlight>Us</SectionHeaderHighlight>
                  ?
                </SectionHeader>
                <SectionDescription className="text-white">
                  <SectionHeaderHighlight>You</SectionHeaderHighlight> can help
                  us create{' '}
                  <SectionHeaderHighlight>Social Impact</SectionHeaderHighlight>{' '}
                  together
                </SectionDescription>

                <SectionDescription className="text-white md:w-4/6">
                  We value sustainability and community empowerment. Through our
                  Corporate Social Responsibility (CSR) initiatives, we
                  collaborate with businesses to repurpose and donate goods,
                  directly benefiting underserved communities. If your
                  organization is looking to fulfill its CSR goals, we invite
                  you to reach out to us. Let&rsquo;s join hands and create a
                  positive change together.
                </SectionDescription>
                <div className="hidden w-full items-end justify-evenly sm:flex">
                  <Earth />
                  <People />
                  <Hands />
                </div>
              </Section>
            </SectionBackgroundAbsolute>
          </SectionBackgroundContent>
        </SectionBackground>

        <Section>
          <SectionHeader>
            Our <SectionHeaderHighlight>Operation</SectionHeaderHighlight>
          </SectionHeader>
          <SectionDescription className="md:w-4/6">
            We are all over the greater Toronto area, operating a local facility
            designed to ensure that the repackaging of items can accommodate
            same-day return needs.
          </SectionDescription>
          <Toronto className="h-56 w-56" />
        </Section>
      </div>
    </div>
  )
}

AboutUs.getLayout = getLayout
