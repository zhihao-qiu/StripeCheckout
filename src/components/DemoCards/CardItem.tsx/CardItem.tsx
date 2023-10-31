import * as React from 'react'
// import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AiFillCheckCircle } from 'react-icons/ai'
import { type CardItemProps } from './type'

export function CardItem({ step, icon, title, description }: CardItemProps) {
  return (
    <Card className="h-[14rem] w-[18rem] md:h-[16rem] md:w-[16rem] lg:h-[20rem] lg:w-[20rem] xl:h-[22rem] xl:w-[23rem]">
      <section className="mt-4 flex items-center justify-between px-4">
        {typeof step === 'number' ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold  text-white lg:h-10 lg:w-10 xl:h-12 xl:w-12 xl:text-subtitle">
            {step}
          </div>
        ) : (
          <AiFillCheckCircle className="h-8 w-8 rounded-full border-4 border-primary bg-white text-primary lg:h-10 lg:w-10 xl:h-12 xl:w-12">
            <style>
              {`
            .text-primary path:first-child {
              fill: white;
            }
          `}
            </style>
          </AiFillCheckCircle>
        )}
        {icon}
      </section>
      <CardHeader>
        <CardTitle className="text-base font-bold sm:text-base  md:text-lg lg:text-2xl xl:text-subtitle">
          {title ? title : description}
        </CardTitle>
      </CardHeader>
      {title ? (
        <CardContent className="text-sm sm:text-base  md:text-base lg:text-xl xl:text-3xl">
          {description}
        </CardContent>
      ) : null}
    </Card>
  )
}

export default CardItem
