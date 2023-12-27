//Should include PUT Method 

import type { NextApiRequest, NextApiResponse } from 'next'
import client, { connectDB, disconnectDB } from '@/lib/db'
import { type Order } from '@/components/DashBoard/types'
// The default function that handles the API request
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extracting the orderId from the request's query parameters
  const { orderId } = req.query
  // Check if orderId is missing or is an array
  if (!orderId || Array.isArray(orderId)) {
    res.status(400).json({ message: 'Invalid orderId' })
    return
  }
  // Connect to the database
  await connectDB()
  // Handling GET requests
  if (req.method === 'GET') {
    try {
      // Access the database and find the order with the specified ID
      const database = client.db('returnpal')
      const orders = database.collection<Order>('orders')
      const order = await orders.findOne({ _id: orderId })
      // If the order is found, respond with a success status and the order details
      if (order) {
        res.status(200).json(order)
      } else {
        // If the order is not found, respond with a 404 status and a message
        res.status(404).json({ message: 'Order not found' })
      }
    } catch (error) {
      // If there's an error during the process, respond with a 500 status and an error message
      res.status(500).json({ message: 'Error retrieving order details', error })
    }
  } else {
    // If the request method is not GET, set the allowed methods in the header and respond with a 405 status
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  // Disconnect from the database after handling the request its very important
  await disconnectDB()
}
