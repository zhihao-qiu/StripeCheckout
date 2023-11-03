import Image from 'next/image'
import SignInForm from '@/components/SignInForm/SignInForm'
import GuestSignInForm from '@/components/SignInForm/GuestSignInForm'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

// Framer-motion
export const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export const item = {
  hidden: { opacity: 0, translateX: 0, translateY: 0 },
  show: {
    opacity: 1,
    translateX: 0,
    translateY: 0,
    transition: { ease: 'easeIn', duration: 0.5 },
  },
}

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
      <motion.div
        className="m-0 h-full w-full p-0"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <DialogContent className="m-0 flex h-5/6 flex-col flex-nowrap items-center justify-start gap-0 bg-paleBlue p-0">
          <motion.div variants={item} className="mt-4 h-auto w-[50%] sm:my-6">
            <Image
              src="/images/returnpal-short-logo.png"
              alt="Return Pal logo"
              width={333}
              height={134}
            />
          </motion.div>
          <Tabs defaultValue="account" className="w-[400px]">
            <motion.div variants={item}>
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
            </motion.div>
            <TabsContent value="account">
              <SignInForm />
            </TabsContent>
            <TabsContent value="password">
              <GuestSignInForm />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </motion.div>
    </Dialog>
  )
}

export default SigninModal
