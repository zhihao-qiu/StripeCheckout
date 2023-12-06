import { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'
import { writeToMongoDB } from '@/lib/mongoHelper'
import { type MockData, type Order } from '@/return-process/confirm-pickup'

interface PaymentIntent {
  // id: string
  amount_received: number
  currency: string
  orderData: MockData
  orderDetail: Order
  // status: string
}

interface Metadata {
  orderData: string
  orderDetail: string
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

    try {
      // Retrieve the payment intent using the session_id
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent'],
      } as Stripe.Checkout.SessionRetrieveParams)

      if (
        typeof session.payment_intent === 'object' &&
        session.payment_intent !== null
      ) {
        const metadata: Metadata = session.metadata as unknown as Metadata

        // Parse metadata.products as JSON
        const orderData = JSON.parse(metadata.orderData) as MockData
        const orderDetail = JSON.parse(metadata.orderDetail) as Order

        // Extract relevant information from the payment intent
        const transactionDetails: PaymentIntent = {
          amount_received: session.payment_intent.amount_received,
          currency: session.payment_intent.currency,
          orderData: orderData,
          orderDetail: orderDetail,
        }

        // console.log('Transaction Details:', transactionDetails)

        // Save in DB
        await writeToMongoDB<PaymentIntent>('orders', [transactionDetails])

        // Opener redirect to complete
        const redirectWindowScript = `<script>window.opener.postMessage("CheckoutSuccess",${req.headers.origin})</script>`
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
