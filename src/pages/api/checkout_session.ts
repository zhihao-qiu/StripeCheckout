import type { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'
import type { Order, UserInfo, Item } from '@/components/DashBoard/types'
import type { ReturnProcessFullObjectType } from '@/context/ReturnProcessContext'

interface LineItem {
  price: string
  quantity: number
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'POST') {
    try {
      const { order } = req.body as { order: Order }
      const { items } = req.body as { items: Item[] }
      const { currentData } = req.body as {
        currentData: Partial<ReturnProcessFullObjectType>
      }
      // const { user } = req.body as { user: UserInfo }
      // search for price_id of subscription

      const lineItems: LineItem[] = items.map((item) => ({
        price: item.itemId,
        quantity: item.quantity ?? 0,
      }))

      const mode =
        !currentData.subscription ||
        currentData.subscription.toLowerCase() === 'bronze'
          ? 'payment'
          : 'subscription'
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
          // ui_mode: 'embedded',
          line_items: lineItems,
          // discounts: [
          //   {
          //     coupon: promoCode,
          //   },
          // ],
          mode: mode,
          allow_promotion_codes: true,
          // automatic_tax: { enabled: true },
          success_url: `${req.headers.origin}/api/checkout_success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
          customer_email: order.client_details.email,
        })

      res.status(200).json({
        checkoutLinkUrl: session.url,
        CHECKOUT_SESSION_ID: session.id,
        CHECKOUT_PAYMENT_INTENT: session.payment_intent,
      })
    } catch (err) {
      console.log((err as Error).message)
      res.status(500).json({ errorMessage: (err as Error).message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
