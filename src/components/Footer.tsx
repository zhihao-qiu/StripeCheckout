import Link from 'next/link'
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="w-full space-y-5 bg-[#052A42] p-5">
      <p className=" text-center text-lg text-white">Check Us Out</p>
      <ul className="mb-4 flex items-center justify-center gap-x-8">
        <li>
          <Link
            href="/"
            className="flex content-center items-center justify-center"
          >
            <FaInstagram size={45} className="text-primary" />
          </Link>
        </li>

        <li>
          <Link
            href="/"
            className="flex content-center items-center justify-center"
          >
            <FaYoutube size={45} className="text-primary" />
          </Link>
        </li>

        <li>
          <Link
            href="/"
            className="flex content-center items-center justify-center"
          >
            <FaTwitter size={45} className="text-primary" />
          </Link>
        </li>

        <li>
          <Link
            href="/"
            className="flex content-center items-center justify-center"
          >
            <FaLinkedin size={45} className="text-primary" />
          </Link>
        </li>
      </ul>
    </div>
  )
}
