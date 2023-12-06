import { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'
import { type MockData } from '@/return-process/confirm-pickup'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'POST') {
    try {
      const { orderData, promoCode } = req.body as {
        orderData: MockData
        promoCode: string
      }

      const lineItems = []

      for (const [key, value] of Object.entries(orderData.productList)) {
        const lineItem = {
          price: key,
          quantity: value || 0,
        }
        lineItems.push(lineItem)
      }
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
          // ui_mode: 'embedded',
          // line_items: [
          //   {
          //     price: 'price_1OFQ6pJLx3jkPDehgceZQr2g',
          //     quantity: 2,
          //     // price_data: {
          //     //   currency: 'cad',
          //     //   product_data: {
          //     //     name: 'Custom amount',
          //     //   },
          //     //   unit_amount: 13000,
          //     // },
          //   },
          // ],
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
          metadata: {
            // orderId: 'aaa',
            products: JSON.stringify(lineItems),
          },
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
