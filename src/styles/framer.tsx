// Framer-motion animation

// Fade-in sequentially
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

export const fadeIn = {
  hidden: { opacity: 0, y: 75 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: 'easeIn', duration: 0.5 },
  },
}
