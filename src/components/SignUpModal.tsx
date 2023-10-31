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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const formSchema = z
  .object({
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
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword
    },
    {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    }
  )

function SignUpModule() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Link href="/" className="font-semibold text-primary">
          <span>&nbsp;Sign Up</span>
        </Link>
      </DialogTrigger>
      <DialogContent className="m-0 flex h-3/4 min-h-[600px] flex-col flex-nowrap items-center justify-start gap-0 bg-paleBlue p-0">
        <h1 className="mb-4 mt-8 font-semibold tracking-wide text-brand sm:text-3xl">
          Sign Up to ReturnPal
        </h1>

        <Form {...form}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 flex flex-col items-center justify-start sm:mt-0"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      minLength={1}
                      className="my-4 h-10 w-[200px] rounded-xl border-4 border-primary text-lg placeholder:text-grey sm:h-12 sm:w-[275px]"
                      placeholder="First Name"
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
                  <FormControl>
                    <Input
                      minLength={1}
                      className="my-4 h-10 w-[200px] rounded-xl border-4 border-primary text-lg placeholder:text-grey sm:h-12 sm:w-[275px]"
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="my-4 h-10 w-[200px] rounded-xl border-4 border-primary text-lg placeholder:text-grey sm:h-12 sm:w-[275px]"
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
                <FormItem>
                  <FormControl>
                    <Input
                      className="my-4 h-10 w-[200px] rounded-xl border-4 border-primary text-lg placeholder:text-grey sm:h-12 sm:w-[275px]"
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="my-4 h-10 w-[200px] rounded-xl border-4 border-primary text-lg placeholder:text-grey sm:h-12 sm:w-[275px]"
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-2 h-10 w-[150px] rounded-3xl text-lg sm:h-12 sm:w-[150px]"
            >
              Sign Up&nbsp;&nbsp;
              <NextArrow />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default SignUpModule
