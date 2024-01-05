import type { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    const sessionId = req.query.session_id as string
    try {
      // Retrieve the payment intent using the session_id
      // const session = await stripe.checkout.sessions.retrieve(sessionId, {
      //   expand: ['payment_intent'],
      // } as Stripe.Checkout.SessionRetrieveParams)
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      if (session.status?.toString() === 'complete') {
        // Opener redirect to complete
        const redirectWindowScript = `<script>window.opener.postMessage('{"action":"CheckoutSuccess","price":${session.amount_total}}')</script>`

        // Close the current window
        const closeWindowScript = '<script>window.close()</script>'

        res.send(redirectWindowScript + closeWindowScript)
      }
    } catch (error) {
      console.error('Error retrieving Stripe session:', error)
      res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
