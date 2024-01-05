// pages/api/userAddresses.tsx
import type { NextApiRequest, NextApiResponse } from 'next'
import client, { connectDB, disconnectDB } from '@/lib/db'
import type { UserInfo, Address } from '@/components/DashBoard/types'
import { ObjectId } from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = new ObjectId(req.query.userId as string)
  await connectDB()
  if (req.method === 'GET') {
    // Get addresses based on userid
    try {
      const dbName = process.env.DATABASE
      const database = client.db(dbName)
      const usersCollection = database.collection<UserInfo>('users')
      const user = await usersCollection.findOne({
        _id: userId,
      })
      if (user) {
        user.addresses?.sort((a, b) => {
          const primaryA = a.primary ? 1 : 0
          const primaryB = b.primary ? 1 : 0
          return primaryB - primaryA
        })

        res.status(200).json(user)
      } else {
        res.status(500).json({ message: 'Error cannot find user' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving orders', error })
    }
  } else if (req.method === 'POST') {
    // Create a new address
    try {
      const dbName = process.env.DATABASE
      const database = client.db(dbName)
      const userCollection = database.collection<UserInfo>('users')

      const existingUser = await userCollection.findOne({ _id: userId })

      if (!existingUser) {
        res.status(404).json({ message: 'User not found' })
        return
      }

      const newAdditionalAddress = req.body as Address
      console.log(newAdditionalAddress)
      // const result = await userCollection.updateOne(
      await userCollection.updateOne(
        { _id: userId },
        {
          $push: {
            additionalAddress: newAdditionalAddress,
          },
        }
      )

      res
        .status(200)
        .json({ message: 'Additional address added successfully', id: userId })
    } catch (error) {
      res.status(500).json({
        message: 'Error creating Error adding additional address',
        error,
      })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  await disconnectDB()
}
