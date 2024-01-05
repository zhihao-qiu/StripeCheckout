import { useReturnProcess } from '@/hooks/useReturnProcess'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  ExtendedToggleGroup,
  ExtendedToggleGroupItem,
} from '@/components/ui/extended-toggle-group'
import Plan from '@components/Plan'
import {
  ReturnProcessBackButton,
  ReturnProcessNextButton,
} from '@components/common/return-process'
import { motion } from 'framer-motion'
import { container, item } from '@styles/framer'
import { subscriptionData } from '@/return-process/subscriptions'

const planData = subscriptionData

const formSchema = z.object({
  plan: z.string(),
  // plan: z.union([
  //   z.literal('Bronze'),
  //   z.literal('Silver'),
  //   z.literal('Gold'),
  //   z.literal('Platinum'),
  // ]),
})

export default function ChoosePlan() {
  const returnProcess = useReturnProcess()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: returnProcess.currentData.subscription,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    returnProcess.setCurrentData({
      subscription: values.plan,
    })
    returnProcess.forward()
  }

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 space-y-8 sm:mt-0"
      >
        <div className="flex min-h-screen w-screen flex-col items-center justify-start bg-paleBlue p-0 sm:p-10">
          <FormField
            control={form.control}
            name="plan"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <ExtendedToggleGroup
                    type="single"
                    selectionType="keep-selected"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <motion.div
                      className="flex w-full flex-wrap justify-center gap-3 sm:gap-8"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {planData.map((plan) => {
                        return (
                          <motion.div key={plan.name} variants={item}>
                            <ExtendedToggleGroupItem value={plan.name} asChild>
                              <Plan plan={plan} />
                            </ExtendedToggleGroupItem>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  </ExtendedToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-8 flex w-10/12 items-center justify-between">
            <ReturnProcessBackButton />
            <ReturnProcessNextButton />
          </div>
        </div>
      </form>
    </Form>
  )
}
