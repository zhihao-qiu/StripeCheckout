// src/pages/api/orders/[orderId].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import client, { connectDB, disconnectDB } from '@/lib/db'
import { type Order } from '@/components/DashBoard/types'
import EmailJS from 'emailjs-com'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB()

  if (req.method === 'GET') {
    // Fetch order details based on orderId
    try {
      const { orderId } = req.query
      const database = client.db('returnpal')
      const orders = database.collection<Order>('orders')
      const order = await orders.findOne({ _id: orderId })

      if (order) {
        res.status(200).json(order)
      } else {
        res.status(404).json({ message: 'Order not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving order details', error })
    }
  } else if (req.method === 'PUT') {
    // Update order status to 'cancelled'
    try {
      const { orderId } = req.query
      const database = client.db('returnpal')
      const orders = database.collection<Order>('orders')
      const result = await orders.updateOne(
        { _id: orderId },
        { $set: { status: 'cancelled' } }
      )

      if (result.matchedCount === 1) {
        // Send cancellation email using EmailJS
        const emailParams = {
          to_email: 'recipient@example.com', // Replace with the actual recipient email
          subject: 'Order Cancellation',
          message: `Order ${orderId} has been cancelled.`,
        }

        await EmailJS.send(
          'your_service_id',
          'your_template_id',
          emailParams,
          'your_user_id'
        )

        res.status(200).json({ message: 'Order cancelled successfully' })
      } else {
        res.status(404).json({ message: 'Order not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error cancelling order', error })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  await disconnectDB()
}
