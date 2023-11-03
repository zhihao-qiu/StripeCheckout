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
import NextArrow from '@components/SvgComponents/NextArrow'
import SignUpModule from '@components/SignUpModal'
import { apolloClient } from '@lib/graphql'
import { gql } from '@apollo/client'

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const writeUserInfoToFragment = (email: string) => {
    apolloClient.writeFragment({
      id: 'User:1',
      fragment: gql`
        fragment MyUser on User {
          id
          email
        }
      `,
      data: {
        email: email,
      },
    })
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <div className="flex w-full flex-col items-center">
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-start"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-4 h-16 sm:mt-6 sm:h-20">
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-4 h-16 sm:mt-6 sm:h-20">
                <FormControl>
                  <Input
                    className="h-10 w-[200px] rounded-xl border-4 border-primary text-lg placeholder:text-grey sm:h-14 sm:w-[275px]"
                    type="password"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href="/sign-in"
            className="mb-5 mt-5 font-semibold text-grey underline sm:mt-3"
          >
            Forgot your password?
          </Link>
          <Button
            type="submit"
            className="h-10 w-[150px] rounded-3xl text-lg sm:h-12 sm:w-[150px]"
          >
            Sign In&nbsp;&nbsp;
            <NextArrow />
          </Button>
        </form>
        <p className="my-8 font-semibold text-grey">
          Don&apos;t have an account yet?
          <SignUpModule />
        </p>
      </div>
    </Form>
  )
}

export default SignInForm
