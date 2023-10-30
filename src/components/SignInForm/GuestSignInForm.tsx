import React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@components/ui/button'
import Link from 'next/link'
import NextArrow from '../SvgComponents/NextArrow'

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
})

function GuestSignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-start space-y-8"
      >
        <div className="mt-10 pb-20 sm:mt-14 sm:pb-20">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 w-[200px] rounded-xl border-4 border-primary text-lg placeholder:text-grey sm:h-14 sm:w-[275px]"
                    type="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="h-10 w-[150px] rounded-3xl text-lg sm:h-12 sm:w-[150px]"
        >
          Next&nbsp;&nbsp;
          <NextArrow />
        </Button>
        <p className="my-8 font-semibold text-grey">
          Don&apos;t have an account yet?
          <Link href="/sign-in" className="font-semibold text-primary">
            <span>&nbsp;Sign Up</span>
          </Link>
        </p>
      </form>
    </Form>
  )
}

export default GuestSignInForm
