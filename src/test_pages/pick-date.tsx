import {
  HomeSection,
  SectionDescription,
  SectionHeader,
  SectionHeaderHighlight,
} from '@/components/home/Home'
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
import { ReturnProcessNextButton } from '@/components/ui/common'
import {
  LastWeekButton,
  NextWeekButton,
  PickDateCard,
} from '@/components/PickDate/PickDate'

export default function PickDate() {
  const returnProcess = useReturnProcess()
  const dateSelection = useDateSelection(new Date())
  const formSchema = z.object({
    pickupDate: z.coerce
      .string()
      .refine((data) => new Date(data) > dateSelection.initialDate, {
        message: 'Start date must be in the future',
      }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupDate: returnProcess.currentData.pickupDate,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Submitted:', values)
    returnProcess.setCurrentData(values)
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
          className="space-y-8"
        >
          <div className="container space-y-20 bg-paleBlue pt-16">
            <HomeSection className="items-start space-y-3">
              <SectionHeader className="flex w-full justify-between font-semibold">
                <div>
                  Choose a pickup{' '}
                  <SectionHeaderHighlight>date</SectionHeaderHighlight>
                </div>
                {/* TODO: This may need to change later depending on what we decide to
            do to exit the return process. Confirmation prompt? */}
                <Link
                  href="/"
                  className="flex flex-col items-center justify-center text-base text-primary hover:cursor-pointer hover:text-brand"
                >
                  <FontAwesomeIcon icon={faClose} width={'35'} height={'35'} />
                  <p>Cancel</p>
                </Link>
              </SectionHeader>
              <SectionDescription>
                We&apos;ll text you the morning of your pickup with an estimated
                time arrival.
              </SectionDescription>
            </HomeSection>

            <div className="flex-row justify-center gap-x-4 space-y-11">
              <div className="flex justify-center gap-x-11 xl:hidden">
                <LastWeekButton
                  size="default"
                  onClick={() => weekBackwards()}
                />
                <NextWeekButton size="default" onClick={() => weekForwards()} />
              </div>

              <div className="flex">
                <LastWeekButton
                  className="hidden xl:flex"
                  size="small"
                  onClick={() => weekBackwards()}
                />

                <FormField
                  control={form.control}
                  name="pickupDate"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <ToggleGroup.Root
                          type="single"
                          className="grid w-full grid-cols-1 place-content-center place-items-center content-center items-center justify-center gap-x-7 gap-y-5 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
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
              </div>
            </div>
            <span className="mt-5 flex justify-end">
              <ReturnProcessNextButton formState={form.formState} />
            </span>
          </div>
        </form>
      </Form>
    </>
  )
}
