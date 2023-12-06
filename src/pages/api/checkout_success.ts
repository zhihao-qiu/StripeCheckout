import { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'

interface PaymentIntent {
  id: string
  amount_received: number
  currency: string
  metadata: Metadata
  status: string
}

interface Metadata {
  // orderId: string
  products: string
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    const sessionId = req.query.session_id as string

    // Retrieve the payment intent using the session_id
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    } as Stripe.Checkout.SessionRetrieveParams)
    if (
      typeof session.payment_intent === 'object' &&
      session.payment_intent !== null
    ) {
      if (
        typeof session.payment_intent === 'object' &&
        session.payment_intent !== null
      ) {
        const metadata: Metadata = session.metadata as unknown as Metadata

        const paymentIntent: PaymentIntent = {
          id: session.payment_intent.id,
          amount_received: session.payment_intent.amount_received,
          currency: session.payment_intent.currency,
          metadata: metadata,
          status: session.payment_intent.status,
        }
        // Extract relevant information from the payment intent
        const transactionDetails = {
          amount: paymentIntent.amount_received,
          currency: paymentIntent.currency,
          productsList: JSON.parse(
            paymentIntent.metadata.products
          ) as Metadata[],
          status: paymentIntent.status,
        }
        console.log('Payment Intent ID:', transactionDetails)
        // Save in DB
        // Opener redirect to complete
        const redirectWindowScript = `<script>window.opener.postMessage("CheckoutSuccess",${req.headers.origin})</script>`
        // Close the current window
        const closeWindowScript = '<script>window.close()</script>'

        res.send(redirectWindowScript + closeWindowScript)
      }
    }
  }
}
