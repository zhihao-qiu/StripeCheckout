import Image from 'next/image'
import SignInForm from '@/components/SignInForm/SignInForm'
import GuestSignInForm from '@/components/SignInForm/GuestSignInForm'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

function SignIn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sign-In</Button>
      </DialogTrigger>
      <DialogContent className="m-0 flex h-3/4 flex-col flex-nowrap items-center justify-start gap-0 bg-paleBlue p-0">
        <Image
          src="/images/returnpal-short-logo.png"
          alt="Return Pal logo"
          width="0"
          height="0"
          sizes="100vw"
          className="mt-4 h-[40px] w-auto sm:my-6"
        />

        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="mb-2 flex justify-center text-lg font-semibold text-grey sm:text-3xl">
            <TabsTrigger value="account">Sign In</TabsTrigger>
            <span className="text-xl font-normal text-primary sm:text-4xl">
              {' | '}
            </span>
            <TabsTrigger value="password">Guest</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <SignInForm />
          </TabsContent>
          <TabsContent value="password">
            <GuestSignInForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default SignIn
