import Image from 'next/image'
import PostalCodeForm from './PostalCodeVerification/PostalCodeForm'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@/components/ui/button'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { container, item } from '@styles/framer'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Default headerType is desktop
function PostalCodeModal({
  headerType = 'desktop',
}: {
  headerType?: 'desktop' | 'mobile'
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  const router = useRouter()

  const handleRedirect = (path: string) => {
    router.push(path)
    handleClose() // Close the modal after redirecting
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {headerType === 'desktop' ? (
          <Button variant="secondary" className="h-9 w-fit">
            Check Availabilty
          </Button>
        ) : (
          <Button
            variant="link"
            className="text-secondary h-fit p-0 text-base hover:text-primary hover:no-underline"
          >
            <p className="flex gap-x-2">
              <FontAwesomeIcon icon={faRightToBracket} width={'17'} />
              Check Availabilty
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
          <p className="flex w-full items-center justify-center pl-2 text-2xl sm:text-3xl">
            Let`s schedule your first pickup
          </p>
          <PostalCodeForm
            onSuccessRedirect={() => handleRedirect('/dashboard')}
            onFailRedirect={(invalidPostalCode: any) =>
              handleRedirect(`/mailing?invalidPostalCode=${invalidPostalCode}`)
            }
          />
        </DialogContent>
      </motion.div>
    </Dialog>
  )
}

export default PostalCodeModal
