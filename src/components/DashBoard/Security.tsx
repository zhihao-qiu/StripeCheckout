import React from 'react'
import DashBoardHeader from '@/components/DashBoard/DashBoardHeader'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Separator } from '../ui/separator'
import Link from 'next/link'
import Reveal from '@components/common/reveal'

const securityFormSchema = z.object({
  oldPassword: z.string().min(8, 'Password must be at least 8 characters'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
})

function Security() {
  const form = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: z.infer<typeof securityFormSchema>) {
    console.log(values)
  }

  return (
    <>
      <DashBoardHeader
        firstName="John"
        lastName="Doe"
        email="john@example.com"
      />
      <div className="flex flex-col space-y-8 px-8 py-4 text-brand">
        <Reveal>
          <h1 className="text-subtitle font-bold">Security</h1>
        </Reveal>
        <div className="flex flex-col">
          <Reveal width="100%">
            <Separator className=" bg-slate-300" />
          </Reveal>
          <Reveal>
            <label className="mb-4 block text-mediumText">
              Change Password:
            </label>
          </Reveal>
          <Form {...form}>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <Reveal width="100%">
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>

                      <FormControl>
                        <Input
                          className="max-w-sm"
                          placeholder="Please Enter Current Password to verify"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  </Reveal>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <Reveal width="100%">
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          className="max-w-sm"
                          placeholder="Please Enter Email to Reset Password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  </Reveal>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <Reveal width="100%">
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          className="max-w-sm"
                          placeholder="Please Enter New Password to Reset Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Make sure it is at least at least 8 characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </Reveal>
                )}
              />
              <Reveal>
                <div className=" space-x-20">
                  <Button type="submit" variant="outline">
                    Update Password
                  </Button>
                  <Link href="/dashboard">
                    <Button variant="link">I forgot my password</Button>
                  </Link>
                </div>
              </Reveal>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Security
