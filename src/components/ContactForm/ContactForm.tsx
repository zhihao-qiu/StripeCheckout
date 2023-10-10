import React from 'react'
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
  // message: z
  //   .string()
  //   .min(1, {
  //     message: 'Message is required',
  //   })
  //   .max(1000, {
  //     message: 'Message must be less than 1000 characters',
  //   }),
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
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg space-y-6"
      >
        <div className="flex flex-col space-y-6 md:flex-row md:justify-between md:space-y-0">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">First Name</FormLabel>
                <FormControl>
                  <Input
                    minLength={1}
                    className="mr-10"
                    placeholder="Please Enter Your First Name."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Last Name</FormLabel>
                <FormControl>
                  <Input
                    minLength={1}
                    className="mr-10"
                    placeholder="Please Enter Your Last Name."
                    {...field}
                  />
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
            <FormItem>
              <FormLabel className="text-black">Email</FormLabel>
              <FormControl>
                <Input placeholder="Please Enter Your Email." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Message</FormLabel>
              <FormControl>
                <Input placeholder="Please Enter Your Message." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm
