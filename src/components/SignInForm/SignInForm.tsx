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
import { motion } from 'framer-motion'
import { container, item } from '@components/SigninModal'

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <motion.div
        className="m-0 h-full w-full p-0"
        variants={container}
        initial="hidden"
        animate="show"
      >
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
                    <motion.div variants={item}>
                      <Input
                        className="h-10 w-[200px] rounded-xl border-4 border-primary text-lg placeholder:text-grey sm:h-14 sm:w-[275px]"
                        type="email"
                        placeholder="Email"
                        {...field}
                      />
                    </motion.div>
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
                    <motion.div variants={item}>
                      <Input
                        className="h-10 w-[200px] rounded-xl border-4 border-primary text-lg placeholder:text-grey sm:h-14 sm:w-[275px]"
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/sign-in"
              className="mb-5 mt-5 font-semibold text-grey underline sm:mt-3"
            >
              <motion.div variants={item}>Forgot your password?</motion.div>
            </Link>
            <motion.div variants={item}>
              <Button
                type="submit"
                className="h-10 w-[150px] rounded-3xl text-lg sm:h-12 sm:w-[150px]"
              >
                Sign In&nbsp;&nbsp;
                <NextArrow />
              </Button>
            </motion.div>
          </form>
          <motion.div variants={item}>
            <p className="my-8 font-semibold text-grey">
              Don&apos;t have an account yet?
              <SignUpModule />
            </p>
          </motion.div>
        </div>
      </motion.div>
    </Form>
  )
}

export default SignInForm
