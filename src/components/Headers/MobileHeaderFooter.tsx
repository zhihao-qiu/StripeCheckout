import {
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function MobileHeaderFooter() {
  return (
    <div className="mt-12 flex w-[70%] justify-around rounded-md border border-primary p-2 text-primary">
      <Link href="/" target="_blank">
        <FontAwesomeIcon
          icon={faInstagram}
          width={'30'}
          height={'30'}
          className="text-primary"
        />
      </Link>
      <Link
        href="https://www.linkedin.com/company/return-pal/about/"
        target="_blank"
      >
        <FontAwesomeIcon
          icon={faLinkedin}
          width={'30'}
          height={'30'}
          className="text-primary"
        />
      </Link>
      <Link href="/" target="_blank">
        <FontAwesomeIcon
          icon={faXTwitter}
          width={'30'}
          height={'30'}
          className="text-primary"
        />
      </Link>
      <Link href="/" target="_blank">
        <FontAwesomeIcon
          icon={faYoutube}
          width={'30'}
          height={'30'}
          className="text-primary"
        />
      </Link>
    </div>
  )
}
