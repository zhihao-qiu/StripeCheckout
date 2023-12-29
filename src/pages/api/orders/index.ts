// pages/api/orders/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import client, { connectDB, disconnectDB } from '@/lib/db'
import { type Order } from '@/components/DashBoard/types'
const dbName = process.env.DATABASE

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB()

  if (req.method === 'GET') {
    // Get all orders
    try {
      const database = client.db(dbName)
      const orders = database.collection<Order>('orders')
      const allOrders = await orders.find({}).toArray()
      res.status(200).json(allOrders)
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving orders', error })
    }
  } else if (req.method === 'POST') {
    // Create a new order
    try {
      const database = client.db(dbName)
      const orders = database.collection<Order>('orders')
      const newOrder = req.body as Order
      const result = await orders.insertOne(newOrder)
      res
        .status(200)
        .json({ message: 'Order created successfully', id: result.insertedId })
    } catch (error) {
      res.status(500).json({ message: 'Error creating order', error })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  await disconnectDB()
}
