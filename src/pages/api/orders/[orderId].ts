import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import client, { connectDB, disconnectDB } from '@/lib/db'
import { type Order } from '@/components/DashBoard/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderId } = req.query

  if (!orderId || Array.isArray(orderId) || !ObjectId.isValid(orderId)) {
    res.status(400).json({ message: 'Invalid orderId' })
    return
  }

  await connectDB()

  if (req.method === 'GET') {
    try {
      const database = client.db('returnpal')
      const orders = database.collection<Order>('orders')

      const order = await orders.findOne({ _id: new ObjectId(orderId) })

      if (order) {
        res.status(200).json(order)
      } else {
        res.status(404).json({ message: 'Order not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving order details', error })
    }
  } else if (req.method === 'PUT') {
    try {
      const database = client.db('returnpal')
      const orders = database.collection<Order>('orders')

      const updatedOrder = req.body as Order

      const result = await orders.updateOne(
        { _id: new ObjectId(orderId) },
        { $set: updatedOrder }
      )

      if (result.matchedCount > 0) {
        res.status(200).json({ message: 'Order updated successfully' })
      } else {
        res.status(404).json({ message: 'Order not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating order', error })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  await disconnectDB()
}
