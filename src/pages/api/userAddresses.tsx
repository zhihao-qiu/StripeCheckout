// pages/api/userAddresses.tsx
import type { NextApiRequest, NextApiResponse } from 'next'
import client, { connectDB, disconnectDB } from '@/lib/db'
import { type UserInfo, Address } from '@/components/DashBoard/types'
import { ObjectId } from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = new ObjectId(req.query.id as string)

  await connectDB()

  if (req.method === 'GET') {
    // Get addresses based on userid
    try {
      const database = client.db('returnpal')
      const userAddresCollection = database.collection<UserInfo>('user')
      const userAddresses = await userAddresCollection.findOne({ _id: userId })
      res.status(200).json(userAddresses)
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving orders', error })
    }
  } else if (req.method === 'POST') {
    // Create a new address
    try {
      const database = client.db('returnpal')
      const userCollection = database.collection<UserInfo>('user')

      const existingUser = await userCollection.findOne({ _id: userId })

      if (!existingUser) {
        res.status(404).json({ message: 'User not found' })
        return
      }

      const newAdditionalAddress = req.body as Address

      const result = await userCollection.updateOne(
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
