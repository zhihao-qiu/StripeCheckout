import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
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


//testing here

const mailingFormSchema = z.object({
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
  email: z.string().email()
})

function MailingForm() {
  const form = useForm({
    resolver: zodResolver(mailingFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  })

  const formRef = useRef<HTMLFormElement | null>(null)

  const onSubmit = (values: z.infer<typeof mailingFormSchema>) => {
    console.log(values)
  }

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()

    const formElement = formRef.current

    if (formElement) {
      try {
        const result = await emailjs.sendForm(
          'service_kaw06lg',
          'template_l0jgijd',
          formElement,
          'D0Xk7y6Z9b9kB-neE'
        )
        console.log(result.text)
        console.log('Email sent successfully')
      } catch (error: unknown) {
        if (error instanceof Error && 'text' in error) {
          console.log(error.text)
        } else {
          console.error('Error sending email:', error)
        }
      }
    } else {
      console.error('Form element is null or undefined.')
    }
  }

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={async (e) => {
          await form.handleSubmit(onSubmit)(e)
          await sendEmail(e)
        }}
        className="w-full space-y-6 lg:space-y-10"
        ref={formRef}
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
        <Reveal width="100%">
          <Button className="w-full rounded-md" type="submit" value="Send">
            Submit
          </Button>
        </Reveal>
      </form>
    </Form>
  )
}

export default MailingForm
