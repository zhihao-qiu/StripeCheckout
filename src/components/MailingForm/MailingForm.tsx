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
import { Input } from '@components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@components/ui/button'
import Reveal from '@components/common/reveal'
import { useRouter } from 'next/router'

interface ResponseData {
  message: string
  id: string
  error: string
}

// testing here

const mailingFormSchema = z.object({
  fullName: z
    .string()
    .min(1, {
      message: 'Full name is required',
    })
    .max(120, {
      message: 'Full name must be less than 120 characters',
    }),
  email: z.string().email(),
})

function MailingForm() {
  const router = useRouter()
  const { invalidPostalCode } = router.query

  const form = useForm({
    resolver: zodResolver(mailingFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
    },
  })

  // handling email sending ufter form is submitted
  const formRef = useRef<HTMLFormElement | null>(null)

  const handleEmailSending = async () => {
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

  const onSubmit = async (values: z.infer<typeof mailingFormSchema>) => {
    const leadsData = { ...values, postalCode: invalidPostalCode }

    //saving data to the DB
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...leadsData,
        }),
      })

      if (response.ok) {
        console.log('User data inserted successfully')
      } else {
        const data = (await response.json()) as ResponseData
        console.error(data.error || 'Failed to insert user data')
      }
    } catch (error) {
      console.error('Error inserting user data:', error)
    }

    await handleEmailSending()
  }

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 lg:space-y-10"
        ref={formRef}
      >
        <div className="flex w-full flex-col justify-between gap-x-2 space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="h-20">
                <Reveal>
                  <FormLabel className="text-black">Full Name</FormLabel>
                </Reveal>
                <FormControl>
                  <Reveal width="100%">
                    <Input
                      minLength={1}
                      className="h-10 rounded-md border-2 border-black text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                      placeholder="Full Name"
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
        </div>
      </form>
    </Form>
  )
}

export default MailingForm
