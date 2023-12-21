import { faClose } from '@fortawesome/free-solid-svg-icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import Head from 'next/head'
import { useReturnProcess } from '@/hooks/useReturnProcess'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDateSelection } from '@/hooks/useDateSelection'
import {
  ReturnProcessNextButton,
  ReturnProcessRoot,
  ReturnProcessSection,
} from '@/components/common/return-process'
import {
  LastWeekButton,
  NextWeekButton,
  PickDateCard,
} from '@components/common/pick-date'
import {
  SectionDescription,
  SectionHeader,
  SectionHeaderHighlight,
} from '@/components/common/section'
import Reveal from '@components/common/reveal'
import { motion } from 'framer-motion'
import { fadeIn } from '@styles/framer'

export default function PickDate() {
  const userId = '657a3c20334ac659a3b33708'

  const returnProcess = useReturnProcess()
  const dateSelection = useDateSelection(new Date())
  const formSchema = z.object({
    dateAndTime: z.coerce
      .string()
      .refine((data) => new Date(data) > dateSelection.initialDate, {
        message: 'Start date must be in the future',
      }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateAndTime: returnProcess.currentData.dateAndTime,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // returnProcess.setCurrentData(values)
    returnProcess.setCurrentData({
      userId: userId,
      dateAndTime: values.dateAndTime,
    })
    returnProcess.forward()
  }

  function weekForwards() {
    dateSelection.forward()
  }

  function weekBackwards() {
    dateSelection.back()
  }

  return (
    <>
      <Head>
        <title>Return Process - Pick Date</title>
      </Head>

      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ReturnProcessRoot>
            <ReturnProcessSection>
              <SectionHeader className="flex w-full justify-between">
                <Reveal>
                  <div>
                    Choose a pickup{' '}
                    <SectionHeaderHighlight>date</SectionHeaderHighlight>
                  </div>
                </Reveal>
                <div className="flex min-h-[59px] min-w-[50px] items-center justify-start">
                  <Reveal>
                    <Link
                      href="/"
                      className="flex flex-col items-center justify-center text-base text-primary hover:cursor-pointer hover:text-brand"
                    >
                      <FontAwesomeIcon
                        icon={faClose}
                        width={'35'}
                        height={'35'}
                      />
                      <p>Cancel</p>
                    </Link>
                  </Reveal>
                </div>
              </SectionHeader>
              <Reveal>
                <SectionDescription>
                  We&apos;ll text you the morning of your pickup with an
                  estimated time arrival.
                </SectionDescription>
              </Reveal>
            </ReturnProcessSection>

            <div className="flex-row justify-center gap-x-4 space-y-11">
              <div className="flex justify-center gap-x-11 xl:hidden">
                <Reveal>
                  <LastWeekButton
                    size="default"
                    onClick={() => weekBackwards()}
                  />
                </Reveal>
                <Reveal>
                  <NextWeekButton
                    size="default"
                    onClick={() => weekForwards()}
                  />
                </Reveal>
              </div>
              <motion.div
                className="flex w-full justify-center"
                variants={fadeIn}
                initial="hidden"
                animate="show"
              >
                <LastWeekButton
                  className="hidden xl:flex"
                  size="small"
                  onClick={() => weekBackwards()}
                />
                <FormField
                  control={form.control}
                  name="dateAndTime"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <ToggleGroup.Root
                          type="single"
                          className="grid grid-cols-1 place-content-center place-items-center content-center items-center justify-center gap-x-7 gap-y-5 xxs:grid-cols-2 xs:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          {dateSelection.getCurrentDays.map((date) => {
                            const dateString = `${date.getFullYear()}/${
                              date.getMonth() + 1
                            }/${date.getDate()}`
                            return (
                              <ToggleGroup.Item
                                key={dateString}
                                value={dateString}
                                asChild
                              >
                                <PickDateCard date={date} />
                              </ToggleGroup.Item>
                            )
                          })}
                        </ToggleGroup.Root>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <NextWeekButton
                  className="hidden xl:flex"
                  size="small"
                  onClick={() => weekForwards()}
                />
              </motion.div>
            </div>
            <span className="mt-5 flex justify-end">
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
