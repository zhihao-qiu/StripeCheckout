// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import client, { connectDB, disconnectDB } from '@/lib/db'
import type { UserInfo, Address } from '@/components/DashBoard/types'
import { ObjectId } from 'mongodb'

interface reqBody {
  userId: string
  address: Address
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB()

  if (req.method === 'GET') {
    // Get user info
    try {
      const userId = new ObjectId(req.query.userId as string)

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
        res.status(404).json({ message: 'Cannot find the user' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error })
    }
  } else if (req.method === 'POST') {
    // Create a new user
    try {
      const dbName = process.env.DATABASE
      const database = client.db(dbName)
      const usersCollection = database.collection<UserInfo>('users')
      const newUser = req.body as UserInfo

      const result = await usersCollection.insertOne(newUser)
      res
        .status(200)
        .json({ message: 'User created successfully', id: result.insertedId })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error creating user', error })
    }
  } else if (req.method === 'PATCH') {
    // create new address
    try {
      const dbName = process.env.DATABASE
      const database = client.db(dbName)
      const usersCollection = database.collection<UserInfo>('users')
      const reqBody = req.body as reqBody
      const userId = new ObjectId(reqBody.userId)

      const newAddress = reqBody.address
      const newAddress_Id = new ObjectId()
      const newAddressWithId = {
        ...newAddress,
        address_id: newAddress_Id,
      }
      await usersCollection.updateOne(
        { _id: userId },
        { $push: { addresses: newAddressWithId } },
        { upsert: false }
      )

      res.status(200).json({
        message: 'Address created successfully',
        address_id: newAddress_Id.toString(),
      })
    } catch (error) {
      console.log('Error creating address:', error)
      res.status(500).json({ message: 'Error creating address', error })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  await disconnectDB()
}
