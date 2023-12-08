import { MongoClient } from 'mongodb'

const url = process.env.MONGODB_URI

if (!url) {
  throw new Error('MONGODB_URI is not defined in the environment variables.')
}

const client = new MongoClient(url)

export async function connectDB() {
  await client.connect()
  console.log('Connected to MongoDB')
}

export async function disconnectDB() {
  await client.close()
  console.log('Disconnected from MongoDB')
}

export default client
