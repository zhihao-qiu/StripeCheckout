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
import NextArrow from '@components/SvgComponents/NextArrow'
import SignUpModule from '@components/SignUpModal'

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
              <FormItem className="mt-4 h-52 sm:mt-6 sm:h-60">
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
          <Button
            type="submit"
            className="h-10 w-[150px] rounded-3xl text-lg sm:h-12 sm:w-[150px]"
          >
            Next&nbsp;&nbsp;
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

export default GuestSignInForm
