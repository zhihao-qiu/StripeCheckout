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
import { motion } from 'framer-motion'
import { container, item } from '@styles/framer'
import { useRouter } from 'next/navigation'
import { isPostalCodeValid } from '@lib/utils'
import SigninModal from '@components/SigninModal'

const formSchema = z.object({
  postalCode: z.string().min(6, 'Please enter valid postal code'),
})

function PostalCodeForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postalCode: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const postalIsValid = isPostalCodeValid(values.postalCode)
    if (postalIsValid) {
      //TODO: Redirect to proper page
      router.push('/dashboard')
    } else {
    }
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
              name="postalCode"
              render={({ field }) => (
                <FormItem className="mt-4 h-16 sm:mt-6 sm:h-20">
                  <FormControl>
                    <motion.div variants={item}>
                      <Input
                        className="h-10 w-[200px] rounded-xl border-4 border-primary text-lg placeholder:text-grey sm:h-14 sm:w-[275px]"
                        type="text"
                        placeholder="L4HL3P"
                        {...field}
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <motion.div variants={item}>
              <Button
                type="submit"
                className="mt-2 h-10 w-[150px] rounded-3xl text-lg sm:h-12 sm:w-[150px]"
              >
                Submit&nbsp;&nbsp;
                <NextArrow />
              </Button>
            </motion.div>
          </form>
          <motion.div variants={item}>
            <p className="my-8 flex flex-col items-center justify-center font-semibold text-grey">
              Already have an account?
              <SigninModal headerType="mobile" />
            </p>
          </motion.div>
        </div>
      </motion.div>
    </Form>
  )
}

export default PostalCodeForm
