import React from 'react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import DashBoardHeader from './DashBoardHeader'

interface UserInfo {
  username: string
  email: string
}

const profileFormSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: 'Username is required',
    })
    .max(60, {
      message: 'Username must be less than 60 characters',
    }),

  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
})

function Profile() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: 'John Doe',
    email: 'john@example.com',
  })

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: userInfo.username,
      email: userInfo.email,
    },
  })

  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    console.log(values)

    setUserInfo({
      username: values.username,
      email: values.email,
    })
  }

  return (
    <div className="w-full text-brand">
      <DashBoardHeader username={userInfo.username} email={userInfo.email} />
      <section className="space-y-12 p-20 text-largeText">
        <h2 className="mb-4 text-title font-semibold">Profile</h2>
        <div className="mb-2 flex gap-10">
          <label className="block">Username:</label>

          <span>{userInfo.username}</span>
        </div>
        <div className="mb-2 flex gap-10">
          <label className="block">Email:</label>

          <span>{userInfo.email}</span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
              {/* TODO figure out api call for user profile update */}
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you are
                    done.
                  </DialogDescription>
                </DialogHeader>

                <div className="my-8 flex w-full flex-col space-y-8">
                  <div className="flex flex-col">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">
                            User Name
                          </FormLabel>
                          <FormControl>
                            <Input id="username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">Email</FormLabel>
                          <FormControl>
                            <Input id="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit">Save changes</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}

export default Profile
