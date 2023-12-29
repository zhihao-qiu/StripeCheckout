// pages/api/orders/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import client, { connectDB, disconnectDB } from '@/lib/db'
import { UserInfo, type Order } from '@/components/DashBoard/types'
import { ObjectId } from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB()

  const updateOrderAndUser = async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    interface reqBody {
      user: UserInfo
      order: Order
    }

    const reqBody = req.body as reqBody
    const newOrder = reqBody.order
    const currentUser = reqBody.user
    try {
      const database = client.db('ReturnPal')
      // need to update itemName here
      // newOrder.items = await Promise.all(
      //   newOrder.items.map(async (item: Item) => {
      //     const { itemId, itemName, quantity } = await getItemNameById(
      //       item.itemId
      //     )
      //     return { itemId, itemName, quantity }
      //   })
      // )

      // need to update orderNumber here
      // newOrder.orderNumber = generateOrderNumber()
      const session = client.startSession()
      try {
        await session.withTransaction(async () => {
          // create new order
          const orders = database.collection<Order>('orders')
          const resultInsertOrder = await orders.insertOne(newOrder)
          // update subscription of user
          const users = database.collection<UserInfo>('users')
          const resultUpdateUser = await users.findOneAndUpdate(
            { _id: new ObjectId(currentUser._id) },
            {
              $set: {
                subscription: newOrder.subscription,
              },
            }
          )
          if (
            resultInsertOrder.acknowledged === false ||
            resultUpdateUser === null
          ) {
            throw new Error('Database transaction failed.')
          } else {
            res.status(200).json({
              message: 'Order created successfully',
              id: resultInsertOrder.insertedId,
            })
          }
        })
      } catch (err) {
        throw new Error('Database transaction failed.', err as Error)
      } finally {
        await session.endSession()
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error creating order', error })
    }
  }

  // dont retrieve information from database, updating
  // async function getItemNameById(itemId: string): Promise<Item> {
  //   const database = client.db('ReturnPal')
  //   const itemsCollection = database.collection<Item>('items')

  //   try {
  //     const result = await itemsCollection.findOne({
  //       itemId: itemId,
  //     })
  //     if (result) {
  //       const { itemId, itemName, quantity } = result as unknown as Item
  //       return { itemId, itemName, quantity }
  //     } else {
  //       throw new Error('Item not found')
  //     }
  //   } catch (error) {
  //     throw new Error('Error retrieving item by ID', error as Error)
  //   }
  // }

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
    await updateOrderAndUser(req, res)
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  await disconnectDB()
}
