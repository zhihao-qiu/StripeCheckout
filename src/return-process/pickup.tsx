import React from 'react'
import Head from 'next/head'
import { useReturnProcess } from '@/hooks/useReturnProcess'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import {
  ExtendedToggleGroup,
  ExtendedToggleGroupItem,
} from '@/components/ui/extended-toggle-group'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Door from '@/components/SvgComponents/Door'
import Box from '@/components/SvgComponents/Box'
import HandingPackage from '@/components/SvgComponents/HandingPackage'
import {
  ReturnProcessBackButton,
  ReturnProcessNextButton,
  ReturnProcessRoot,
  ReturnProcessSection,
} from '@/components/common/return-process'
import { SectionDescription, SectionHeader } from '@/components/common/section'
import Reveal from '@components/common/reveal'

const formSchema = z.object({
  pickupType: z.union([z.literal('direct'), z.literal('doorstep')]),
})

export default function Pickup() {
  const returnProcess = useReturnProcess()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupType: returnProcess.currentData.pickupType,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Submitted:', values)
    returnProcess.setCurrentData(values)
    returnProcess.forward()
  }

  const cardClassnames =
    'data-[state=on]:border-6 sm:data-[state=on]:scale-120 flex h-96 md:w-2/6  select-none flex-col items-center space-y-2 border-brand bg-white text-brand data-[state=on]:scale-110 data-[state=on]:border-primary data-[state=off]:bg-slate-300 data-[state=off]:opacity-50 data-[state=on]:shadow-2xl xs:data-[state=on]:border-8'

  const cardTitleClassnames =
    'flex flex-col text-base xxs:text-xl md:text-2xl  text-center font-semibold md:font-bold sm:h-36'

  const cardDescriptionClassNames =
    'flex w-4/5 items-center text-xs xxs:text-sm text-brand xs:w-full xs:text-base sm:font-semibold'

  return (
    <>
      <Head>
        <title>Return Process - Pickup Method</title>
      </Head>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ReturnProcessRoot>
            <ReturnProcessSection>
              <Reveal>
                <SectionHeader>Pickup Details</SectionHeader>
              </Reveal>
              <Reveal>
                <SectionDescription className="text-start sm:text-center">
                  Which pickup method do you prefer?
                </SectionDescription>
              </Reveal>
            </ReturnProcessSection>

            <FormField
              control={form.control}
              name="pickupType"
              render={({ field }) => (
                <FormItem className="flex justify-center space-y-3">
                  <FormControl>
                    <ExtendedToggleGroup
                      type="single"
                      selectionType="keep-selected"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex max-w-screen-lg justify-center gap-x-5 sm:gap-x-10 md:gap-x-20"
                    >
                      <ExtendedToggleGroupItem value="direct" asChild>
                        <Card className={cardClassnames}>
                          <CardHeader className="flex items-center pl-5">
                            <Reveal>
                              <CardTitle className={cardTitleClassnames}>
                                <div className="flex items-end justify-center align-bottom">
                                  <HandingPackage className="h-12 w-12 fill-primary xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" />
                                </div>
                                Direct Handoff
                              </CardTitle>
                            </Reveal>
                            <Reveal>
                              <CardDescription
                                className={cardDescriptionClassNames}
                              >
                                Hand the package directly to our specialist at
                                your door
                              </CardDescription>
                            </Reveal>
                          </CardHeader>
                        </Card>
                      </ExtendedToggleGroupItem>

                      <ExtendedToggleGroupItem value="doorstep" asChild>
                        <Card className={cardClassnames}>
                          <CardHeader className="flex items-center pl-5">
                            <Reveal>
                              <CardTitle className={cardTitleClassnames}>
                                <div className="flex items-end justify-center align-bottom">
                                  <Door className="h-12 w-12 xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" />
                                  <Box className="h-5 w-5 xxs:h-7 xxs:w-7 xs:h-10 xs:w-10" />
                                </div>
                                Leave on Doorstep
                              </CardTitle>
                            </Reveal>
                            <Reveal>
                              <CardDescription
                                className={cardDescriptionClassNames}
                              >
                                Place items outside your door ahead of your pick
                                up window
                              </CardDescription>
                            </Reveal>
                          </CardHeader>
                        </Card>
                      </ExtendedToggleGroupItem>
                    </ExtendedToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span className="mt-5 flex justify-between">
              <Reveal>
                <ReturnProcessBackButton />
              </Reveal>
              <Reveal>
                <ReturnProcessNextButton />
              </Reveal>
            </span>
          </ReturnProcessRoot>
        </form>
      </Form>
    </>
  )
}
