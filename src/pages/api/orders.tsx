import type {
  NextApiRequest as Request,
  NextApiResponse as Response,
} from 'next'
import client, { connectDB, disconnectDB } from '@/lib/db'
import { Order } from '@/components/Dashboard/types'

// Assuming there's a type/interface for your request body
interface CancelOrderRequest {
  orderId: string // Adjust the type accordingly
}

export default async function handler(
  req: Request<CancelOrderRequest>, // Use the imported Request type
  res: Response
) {
  await connectDB()

  if (req.method === 'GET') {
    // Get all orders
    try {
      const database = client.db('returnpal')
      const orders = database.collection<Order>('orders')
      const allOrders = await orders.find({}).toArray()
      res.status(200).json(allOrders)
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving orders', error })
    }
  } else if (req.method === 'POST') {
    // Create a new order
    try {
      const database = client.db('returnpal')
      const orders = database.collection<Order>('orders')
      const newOrder = req.body as Order
      const result = await orders.insertOne(newOrder)
      res
        .status(200)
        .json({ message: 'Order created successfully', id: result.insertedId })
    } catch (error) {
      res.status(500).json({ message: 'Error creating order', error })
    }
  } else if (req.method === 'PUT') {
    // Update order status to 'cancelled'
    try {
      const database = client.db('returnpal')
      const orders = database.collection<Order>('orders')
      const { orderId } = req.body
      const result = await orders.updateOne(
        { _id: orderId },
        { $set: { status: 'cancelled' } }
      )
      if (result.matchedCount === 1) {
        res.status(200).json({ message: 'Order cancelled successfully' })
      } else {
        res.status(404).json({ message: 'Order not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error cancelling order', error })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  await disconnectDB()
}
