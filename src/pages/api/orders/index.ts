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

  const pageSize = 20
  const page = parseInt(req.query.page as string) || 1

  try {
    const database = client.db(dbName)
    const orders = database.collection<Order>('orders')

    if (req.method === 'GET') {
      const skip = (page - 1) * pageSize
      const paginatedOrders = await orders
        .find({})
        .skip(skip)
        .limit(pageSize)
        .toArray()

      const totalOrdersCount = await orders.countDocuments({})
      const totalPages = Math.ceil(totalOrdersCount / pageSize)

      res.status(200).json({
        paginatedOrders,
        currentPage: page,
        totalPages,
        totalOrders: totalOrdersCount,
      })
    } else if (req.method === 'POST') {
      const newOrder = req.body as Order
      const result = await orders.insertOne(newOrder)
      res
        .status(200)
        .json({ message: 'Order created successfully', id: result.insertedId })
    } else {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing request', error })
  } finally {
    await disconnectDB()
  }
}
