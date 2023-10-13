import Link from 'next/link'
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'

function MobileMenuFooter() {
  return (
    <div className="mt-12 flex w-[70%] justify-around rounded-md border border-primary p-2 text-primary">
      <Link href="/" target="_blank">
        <FaInstagram size={25} />
      </Link>
      <Link
        href="https://www.linkedin.com/company/return-pal/about/"
        target="_blank"
      >
        <FaLinkedin size={25} />
      </Link>
      <Link href="/" target="_blank">
        <FaTwitter size={25} />
      </Link>
      <Link href="/" target="_blank">
        <FaYoutube size={25} />
      </Link>
    </div>
  )
}

export default MobileMenuFooter
