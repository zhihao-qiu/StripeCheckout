import {
  type IconDefinition,
  faInstagram,
  faYoutube,
  faXTwitter,
  faLinkedin,
  faTiktok,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

type FooterButtonLinkProps = {
  href: string
  icon: IconDefinition
}

function FooterButtonLink({ href, icon }: FooterButtonLinkProps) {
  return (
    <li>
      <Link href={href} target="_blank">
        <FontAwesomeIcon icon={icon} width={'35'} className="text-primary" />
      </Link>
    </li>
  )
}

export default function Footer() {
  return (
    <div className="w-full space-y-5 bg-brand p-5">
      <p className="text-center text-lg text-white">Check Us Out</p>
      <ul className="flew-row grid grid-cols-3 place-content-center place-items-center content-center items-center justify-center gap-2 gap-x-6 xs:flex">
        <FooterButtonLink icon={faInstagram} href="/" />
        <FooterButtonLink icon={faYoutube} href="/" />
        <FooterButtonLink icon={faXTwitter} href="/" />
        <FooterButtonLink icon={faLinkedin} href="/" />
        <FooterButtonLink icon={faTiktok} href="/" />
        <FooterButtonLink icon={faFacebook} href="/" />
      </ul>
    </div>
  )
}
