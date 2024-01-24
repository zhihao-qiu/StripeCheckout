import Image from 'next/image'
import PostalCodeForm from './PostalCodeVerification/PostalCodeForm'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { motion } from 'framer-motion'
import { container, item } from '@styles/framer'
import { useRouter } from 'next/navigation'
import { type ModalPropsType } from '@/components/DashBoard/types'

// Default headerType is desktop
function PostalCodeModal({ setIsOpen, isOpen }: ModalPropsType) {
  const router = useRouter()

  const handleRedirect = (path: string) => {
    router.push(path)
    setIsOpen() // Close the modal after redirecting
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen()}>
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
            // onSuccessRedirect={}
            onFailRedirect={(invalidPostalCode: string) =>
              handleRedirect(`/mailing?invalidPostalCode=${invalidPostalCode}`)
            }
          />
        </DialogContent>
      </motion.div>
    </Dialog>
  )
}

export default PostalCodeModal
