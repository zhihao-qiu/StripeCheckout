import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import React from 'react'

function Faq() {
  return (
    <Accordion
      type="single"
      collapsible
      className="flex w-1/2 flex-col justify-center space-y-10 text-center"
    >
      <AccordionItem
        value="item-1"
        className="w-full max-w-xs self-center rounded-xl border-4 border-primary px-4 text-sm text-white transition-all duration-200 hover:cursor-pointer hover:bg-gradientL sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-4xl xl:text-subtitle"
      >
        <AccordionTrigger className="font-bold">
          Do I need to package my returns?{' '}
        </AccordionTrigger>
        <AccordionContent className="text-left">
          <iframe
            width="520"
            height="300"
            className="pt-3"
            // src="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=2"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-2"
        className="w-full max-w-xs self-center rounded-xl border-4 border-primary px-4 text-sm text-white transition-all duration-200 hover:cursor-pointer hover:bg-gradientL sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-4xl xl:text-subtitle"
      >
        <AccordionTrigger className="font-bold">
          Can I return on weekends?{' '}
        </AccordionTrigger>
        <AccordionContent className="text-left">
          M0 0L80 39.2857C160 78.5714 320 157.143 480 174.286C640 191.429 800
          157.143 960 122.857C1120 88.5714 1280 57.1429 1440 57.1429C1600
          57.1429 1760 88.5714 1840 109.286L1920 122.857V363H1840C1760 363 1600
          363 1440 363C1280 363 1120 363 960 363C800 363 640 363 480 363C320 363
          160 363 80 363H0V0Z
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-3"
        className="w-full max-w-xs self-center rounded-xl border-4 border-primary px-4 text-sm text-white transition-all duration-200 hover:cursor-pointer hover:bg-gradientL sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-4xl xl:text-subtitle"
      >
        <AccordionTrigger className="font-bold">
          How long does shipping take?{' '}
        </AccordionTrigger>
        <AccordionContent className="text-left">
          TODO - Add content here
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-4"
        className="w-full max-w-xs self-center rounded-xl border-4 border-primary px-4 text-sm text-white transition-all duration-200 hover:cursor-pointer hover:bg-gradientL sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-4xl xl:text-subtitle"
      >
        <AccordionTrigger className="font-bold">
          How long does shipping take?{' '}
        </AccordionTrigger>
        <AccordionContent className="text-left">
          TODO - Add content here
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
export default Faq
