import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface Props {
  children: JSX.Element
  width?: 'fit-content' | '100%'
  center?: boolean
}

export default function Reveal({
  children,
  width = 'fit-content',
  center = false,
}: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px -25px 0px',
  })
  const mainControls = useAnimation()
  const centerContent = center ? 'flex justify-center w-full' : ''

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible').catch(e)
    }
  }, [isInView, mainControls])

  return (
    <div
      ref={ref}
      style={{ position: 'relative', width, overflow: 'hidden' }}
      className={centerContent}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5 }}
        className={centerContent}
      >
        {children}
      </motion.div>
    </div>
  )
}
function e(reason: ErrorOptions | undefined): PromiseLike<never> {
  throw new Error('Function not implemented.', reason)
}
