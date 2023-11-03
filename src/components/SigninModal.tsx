import Image from 'next/image'
import SignInForm from '@/components/SignInForm/SignInForm'
import GuestSignInForm from '@/components/SignInForm/GuestSignInForm'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

// Default headerType is desktop
function SigninModal({
  headerType = 'desktop',
}: {
  headerType?: 'desktop' | 'mobile'
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {headerType === 'desktop' ? (
          <Button variant="secondary" className="h-9 w-24">
            Sign In
          </Button>
        ) : (
          <Button
            variant="link"
            className="text-secondary h-fit p-0 text-base hover:text-primary hover:no-underline"
          >
            <p className="flex gap-x-2">
              <FontAwesomeIcon icon={faRightToBracket} width={'17'} />
              Sign In
            </p>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="m-0 flex h-5/6 flex-col flex-nowrap items-center justify-start gap-0 bg-paleBlue p-0">
        <Image
          src="/images/returnpal-short-logo.png"
          alt="Return Pal logo"
          width={333}
          height={134}
          className="mt-4 h-auto w-[50%] sm:my-6"
        />

        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="mb-2 mt-2 flex justify-center font-semibold text-grey sm:mt-0">
            <TabsTrigger
              value="account"
              className="flex w-full justify-end pr-2 text-2xl sm:text-3xl"
            >
              <span>Sign In</span>
            </TabsTrigger>
            <span className="pb-1 text-3xl font-normal text-primary sm:pb-2 sm:text-4xl">
              {'|'}
            </span>
            <TabsTrigger
              value="password"
              className="flex w-full justify-start pl-2 text-2xl sm:text-3xl"
            >
              <span>Guest</span>
            </TabsTrigger>
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

export default SigninModal
