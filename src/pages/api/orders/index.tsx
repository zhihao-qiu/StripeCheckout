// pages/api/orders/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import client, { connectDB, disconnectDB } from '@/lib/db'
import type { Item, Order } from '@/components/DashBoard/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB()

  async function getItemNameById(itemId: string): Promise<Item> {
    const database = client.db('ReturnPal')
    const itemsCollection = database.collection<Item>('items')

    try {
      const result = await itemsCollection.findOne({
        itemId: itemId,
      })
      if (result) {
        const { itemId, itemName, quantity } = result as unknown as Item
        return { itemId, itemName, quantity }
      } else {
        throw new Error('Item not found')
      }
    } catch (error) {
      throw new Error('Error retrieving item by ID', error as Error)
    }
  }

  if (req.method === 'GET') {
    // Get all orders
    try {
      const database = client.db('ReturnPal')
      const orders = database.collection<Order>('orders')
      const allOrders = await orders.find({}).toArray()
      res.status(200).json(allOrders)
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving orders', error })
    }
  } else if (req.method === 'POST') {
    // Create a new order
    try {
      const database = client.db('ReturnPal')
      const orders = database.collection<Order>('orders')
      const newOrder = req.body as Order

      // need to update itemName here
      newOrder.items = await Promise.all(
        newOrder.items.map(async (item: Item) => {
          const { itemId, itemName, quantity } = await getItemNameById(
            item.itemId
          )
          return { itemId, itemName, quantity }
        })
      )
      // need to update email here

      // need to update orderNumber here
      // newOrder.orderNumber = generateOrderNumber()

      const result = await orders.insertOne(newOrder)
      res
        .status(200)
        .json({ message: 'Order created successfully', id: result.insertedId })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error creating order', error })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  await disconnectDB()
}
