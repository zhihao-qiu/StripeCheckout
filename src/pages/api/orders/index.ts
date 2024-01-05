// pages/api/orders/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import client, { connectDB, disconnectDB } from '@/lib/db'
import type { UserInfo, Order } from '@/components/DashBoard/types'
import { ObjectId } from 'mongodb'
const dbName = process.env.DATABASE

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB()

  const pageSize = 20
  const page = parseInt(req.query.page as string) || 1
  const database = client.db(dbName)

  try {
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
      interface reqBody {
        user: UserInfo
        order: Order
      }

      const reqBody = req.body as reqBody
      const newOrder = reqBody.order
      const currentUser = reqBody.user
      // TODO: need to update orderNumber here
      // newOrder.orderNumber = generateOrderNumber()

      // create new order
      const resultInsertOrder = await orders.insertOne(newOrder)
      // update subscription of user
      const users = database.collection<UserInfo>('users')
      const resultUpdateUser = await users.findOneAndUpdate(
        { _id: new ObjectId(currentUser._id) },
        {
          $set: {
            subscription: newOrder.client_details.subscription,
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
