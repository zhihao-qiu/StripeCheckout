import { Separator } from '../ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@components/ui/button'
import Stamp from '../SvgComponents/Stamp'
import Link from 'next/link'
import { type MockData } from '@/return-process/confirm-pickup'
import { useReturnProcess } from '@hooks/useReturnProcess'

interface Props {
  promoState: [string, React.Dispatch<React.SetStateAction<string>>]
  orderData: MockData
}

const formSchema = z.object({
  promo: z.string(),
})

export default function OrderSummary({
  promoState: [promoCode, setPromoCode],
  orderData,
}: Props) {
  const returnProcess = useReturnProcess()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promo: promoCode,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setPromoCode(values.promo)
  }

  return (
    <section className="mx-1 tracking-normal sm:w-1/3">
      <div className="flex h-fit max-w-[300px] flex-col items-center rounded-xl border-2 border-brand bg-white shadow-2xl">
        <p className="mt-6 text-smallText font-semibold text-primary sm:text-2xl">
          Order Summary
        </p>
        <Separator className="mb-4 mt-4 w-2/3 bg-brand" />
        <p className="font-regular mt-2 flex w-5/6 justify-between text-smallText sm:text-xl">
          <span>One-time Return</span>
          <span>$ {(Number(orderData.bronzePrice) / 100).toFixed(2)}</span>
        </p>
        {orderData.extraBoxes && (
          <p className="font-regular mt-2 flex w-5/6 justify-between text-smallText sm:text-xl">
            <span>
              {orderData.extraBoxes} additional box
              {orderData.extraBoxes > 1 && 'es'}
            </span>
            <span>
              ${' '}
              {(
                (Number(orderData.extraBoxes) *
                  Number(orderData.extraBoxPrice)) /
                100
              ).toFixed(2)}
            </span>
          </p>
        )}
        <p className="font-regular mt-2 flex w-5/6 justify-between text-smallText sm:text-xl">
          <span>Tax</span>
          <span>$ 1.50</span>
        </p>
        <p className="mt-2 flex w-5/6 justify-between text-smallText font-bold sm:text-xl">
          <span>Total</span>
          <span>$ 16.48</span>
        </p>
        <Form {...form}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={form.handleSubmit(onSubmit)}
            className="my-6 flex h-10 w-[87%] justify-between rounded-xl border-4 border-primary sm:h-14"
          >
            <FormField
              control={form.control}
              name="promo"
              render={({ field }) => (
                <FormItem className="flex w-2/3 justify-center">
                  <FormControl>
                    <input
                      className="flex h-full w-11/12 rounded-none border-0 bg-transparent text-xl text-brand placeholder:text-center placeholder:text-grey focus:outline-0"
                      type="text"
                      placeholder="Promo Code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-full w-1/3 rounded-l-none rounded-r-lg text-xl"
            >
              Apply
            </Button>
          </form>
        </Form>
        <div className="mb-6 flex w-[87%] justify-between rounded-xl bg-paleBlue p-4">
          <Stamp />
          <Link href="/" className="w-8/12 text-primary underline">
            Upgrade to unlimited pickups for $19.99/month
          </Link>
        </div>
      </div>
      <Button
        className="mt-6 h-fit w-full max-w-[300px] sm:text-xl"
        onClick={() => returnProcess.forward()}
      >
        Confirm Pickup
      </Button>
    </section>
  )
}
