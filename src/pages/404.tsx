import { Button } from '@/components/ui/button'
import { getLayout } from '@/layouts/DefaultLayout'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404 - Not Found</title>
        <meta name="description" content="404 - Page not found" />
      </Head>

      <div className="flex h-screen flex-col items-center justify-center space-y-10">
        <p className="text-9xl text-primary">404</p>
        <div className="container flex flex-col items-center">
          <div className="mb-6 text-brand">
            The requested page you are looking for doesn&rsquo;t exist...
          </div>
          <Button asChild>
            <Link
              className="flex cursor-pointer items-center space-x-2"
              href="/"
            >
              <p>Back To Home</p>
              <FontAwesomeIcon width={'15'} height={'15'} icon={faHome} />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}

NotFoundPage.getLayout = getLayout
