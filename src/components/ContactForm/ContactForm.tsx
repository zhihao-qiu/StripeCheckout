import React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Textarea } from '../ui/textarea'
import { Input } from '@components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@components/ui/button'
import Reveal from '@components/common/reveal'

const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: 'First name is required',
    })
    .max(60, {
      message: 'First name must be less than 60 characters',
    }),
  lastName: z
    .string()
    .min(1, {
      message: 'Last name is required',
    })
    .max(60, {
      message: 'Last name must be less than 60 characters',
    }),
  email: z.string().email(),
  message: z
    .string()
    .min(1, {
      message: 'Message is required',
    })
    .max(1000, {
      message: 'Message must be less than 1000 characters',
    }),
})

function ContactForm() {
  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    console.log(values)
  }

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
  })

  return (
    <Form {...form}>
      <form
        // TODO figure out api call for email sending
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 lg:space-y-10"
      >
        <div className="flex w-full flex-col gap-x-2 space-y-6 lg:flex-row lg:justify-between lg:space-y-0">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="h-20">
                <Reveal>
                  <FormLabel className="text-black">First Name</FormLabel>
                </Reveal>
                <FormControl>
                  <Reveal>
                    <Input
                      minLength={1}
                      className="h-10 shrink rounded-md border-2 border-black text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                      placeholder="First Name"
                      size={30}
                      {...field}
                    />
                  </Reveal>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="h-20">
                <Reveal>
                  <FormLabel className="text-black">Last Name</FormLabel>
                </Reveal>
                <FormControl>
                  <Reveal>
                    <Input
                      minLength={1}
                      className="h-10 shrink rounded-md border-2 border-black text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                      placeholder="Last Name"
                      size={30}
                      {...field}
                    />
                  </Reveal>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="h-20">
              <Reveal>
                <FormLabel className="text-black">Email</FormLabel>
              </Reveal>
              <FormControl>
                <Reveal width="100%">
                  <Input
                    className="h-10 rounded-md border-2 border-black text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                    placeholder="Please Enter Your Email."
                    size={60}
                    {...field}
                  />
                </Reveal>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="h-44">
              <Reveal>
                <FormLabel className="text-black">Message</FormLabel>
              </Reveal>
              <FormControl>
                <Reveal width="100%">
                  <Textarea
                    placeholder="Please Enter Your Message"
                    className="h-36 w-full rounded-md border-2 border-black text-sm placeholder:text-grey sm:h-36 sm:text-lg"
                    {...field}
                  />
                </Reveal>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Reveal width="100%">
          <Button className="w-full rounded-md" type="submit">
            Submit
          </Button>
        </Reveal>
      </form>
    </Form>
  )
}

export default ContactForm
