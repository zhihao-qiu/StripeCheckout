import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Reveal from '@components/common/reveal'

import React from 'react'

const faqQuestionClassName =
  'w-full max-w-xs self-center rounded-xl border-4 border-primary px-4 text-sm text-white transition-all duration-200 hover:cursor-pointer hover:bg-gradientL sm:max-w-md md:max-w-lg md:text-base lg:max-w-xl lg:text-lg xl:max-w-4xl xl:text-mediumText'

function Faq() {
  return (
    <Accordion
      type="single"
      collapsible
      className="flex w-1/2 flex-col justify-center space-y-10 text-center"
    >
      <Reveal width="100%">
        <AccordionItem value="item-1" className={faqQuestionClassName}>
          <AccordionTrigger className="font-bold">
            Can I return items on weekends or holidays?{' '}
          </AccordionTrigger>
          <AccordionContent className="text-left">
            {/* <iframe
              width="520"
              height="300"
              className="pt-3"
              // src="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=2"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            /> */}
            Yes, you can return items anytime you want. We collect returns 24/7,
            7 days a week.
          </AccordionContent>
        </AccordionItem>
      </Reveal>

      <Reveal width="100%">
        <AccordionItem value="item-2" className={faqQuestionClassName}>
          <AccordionTrigger className="font-bold">
            How fast will my item be shipped back to the retailer?{' '}
          </AccordionTrigger>
          <AccordionContent className="text-left">
            Usually, your item will be delivered to the post office within 12-24
            hours of your return request.
          </AccordionContent>
        </AccordionItem>
      </Reveal>

      <Reveal width="100%">
        <AccordionItem value="item-3" className={faqQuestionClassName}>
          <AccordionTrigger className="font-bold">
            What if I have more questions or need help?{' '}
          </AccordionTrigger>
          <AccordionContent className="text-left">
            Please contact us here. We are happy to assist you with any queries
            or issues.
          </AccordionContent>
        </AccordionItem>
      </Reveal>

      <Reveal width="100%">
        <AccordionItem value="item-4" className={faqQuestionClassName}>
          <AccordionTrigger className="font-bold">
            Can I return items from any online store and any courier with
            ReturnPal?{' '}
          </AccordionTrigger>
          <AccordionContent className="text-left">
            Yes! ReturnPal works with all online retailers and couriers. You can
            use our service to return anything you bought online.
          </AccordionContent>
        </AccordionItem>
      </Reveal>
      <Reveal width="100%">
        <AccordionItem value="item-5" className={faqQuestionClassName}>
          <AccordionTrigger className="font-bold">
            Do I have to package my item before returning it?{' '}
          </AccordionTrigger>
          <AccordionContent className="text-left">
            No, you don&apos;t have to worry about packaging. We will do it for
            you when we collect your item.
          </AccordionContent>
        </AccordionItem>
      </Reveal>
      <Reveal width="100%">
        <AccordionItem value="item-6" className={faqQuestionClassName}>
          <AccordionTrigger className="font-bold">
            Do I have to print my return label before returning it?{' '}
          </AccordionTrigger>
          <AccordionContent className="text-left">
            No, you don&apos;t have to print anything. Just upload your return
            label or receipt to our app or website and we will print it for you.
          </AccordionContent>
        </AccordionItem>
      </Reveal>
    </Accordion>
  )
}
export default Faq
