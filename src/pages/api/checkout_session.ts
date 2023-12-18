import type { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'
import type { Order } from '@/components/DashBoard/types'

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

      const lineItems: LineItem[] = order.items.map((item) => ({
        price: item.itemName,
        quantity: item.quantity || 0,
      }))

      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
          // ui_mode: 'embedded',
          line_items: lineItems,
          // discounts: [
          //   {
          //     coupon: promoCode,
          //   },
          // ],
          mode: 'payment',
          allow_promotion_codes: true,
          // return_url: `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
          // automatic_tax: { enabled: true },
          success_url: `${req.headers.origin}/api/checkout_success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
          // metadata: {
          //   order: JSON.stringify(order),
          // },
          customer_email: 'john_doe@example.com',
        })

      // res.send({ clientSecret: session.client_secret })

      res
        .status(200)
        .json({ checkoutLinkUrl: session.url, CHECKOUT_SESSION_ID: session.id })
      // console.log(session.id)
      // res.status(200).json({ session_id: session.id })
      // res.redirect(303, session.url!)

      // returnProcess.forward()
    } catch (err) {
      console.log((err as Error).message)
      res.status(500).json({ errorMessage: (err as Error).message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
  // switch (req.method) {
  //   case 'POST':
  //     try {
  //       // Create Checkout Sessions from body params.
  //       const session = await stripe.checkout.sessions.create({
  //         ui_mode: 'embedded',
  //         line_items: [
  //           {
  //             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
  //             price: 'price_1OFQ6pJLx3jkPDehgceZQr2g',
  //             quantity: 1,
  //           },
  //         ],
  //         mode: 'payment',
  //         return_url: `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
  //         automatic_tax: { enabled: false },
  //       })

  //       res.send({
  //         clientSecret: session.client_secret,
  //         // CHECKOUT_SESSION_ID: session.id,
  //       })
  //       break
  //     } catch (err) {
  //       console.log((err as Error).message)
  //       res.status(500).json({ errorMessage: (err as Error).message })
  //     }
  //     break
  //   case 'GET':
  //     try {
  //       console.log('session id', req.query.session_id)
  //       const session = await stripe.checkout.sessions.retrieve(
  //         req.query.session_id! as string
  //       )

  //       res.send({
  //         status: session.status,
  //         customer_email: session.customer_details?.email,
  //       })
  //       break
  //     } catch (err) {
  //       console.log((err as Error).message)
  //       res.status(500).json((err as Error).message)
  //     }
  //   default:
  //     res.setHeader('Allow', req.method ?? 'GET')
  //     res.status(405).end('Method Not Allowed')
  // }
}
