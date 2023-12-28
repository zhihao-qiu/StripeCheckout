import type { NextApiRequest, NextApiResponse } from 'next'
import { type LeadData } from '@components/DashBoard/types'
import client, { connectDB, disconnectDB } from '@/lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connect to the database
  await connectDB()

  if (req.method === 'POST') {
    // add lead to DB
    try {
      const database = client.db('ReturnPal')
      const leads = database.collection<LeadData>('mailingList')

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

  await disconnectDB()
}
