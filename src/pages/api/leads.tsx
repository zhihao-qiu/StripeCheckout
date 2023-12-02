import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

// Define the structure of the data using TypeScript interface
// TODO: update to full name if needed

interface LeadData {
  firstName: string
  lastName: string
  postal: string
  email: string
}

// MongoDB connection URI
const url = process.env.MONGODB_URI
if (!url) {
  throw new Error('MONGODB_URI is not defined in the environment variables.')
}
const client = new MongoClient(url)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Connect to the database
      await client.connect()
      const database = client.db('test')
      const leads = database.collection<LeadData>('leads')

      // Add the data to the database
      const leadData = req.body as LeadData
      const result = await leads.insertOne(leadData)

      res
        .status(200)
        .json({ message: 'Data saved successfully', id: result.insertedId })
    } catch (error) {
      res.status(500).json({ message: 'Error saving data to DB', error })
    } finally {
      await client.close()
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
