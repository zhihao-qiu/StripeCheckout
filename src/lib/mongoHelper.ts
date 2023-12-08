import {
  MongoClient,
  MongoClientOptions,
  Document,
  OptionalUnlessRequiredId,
} from 'mongodb'

const uri = process.env.uri!

export async function writeToMongoDB<T extends Document>(
  collectionName: string,
  data: T[]
): Promise<void> {
  const client = new MongoClient(uri, {
    useNewUrlParser: false,
    useUnifiedTopology: true,
  } as MongoClientOptions)

  try {
    await client.connect()

    const database = client.db('ReturnPal')
    const collection = database.collection<T>(collectionName)

    // Insert data into the collection
    const result = await collection.insertMany(
      data as OptionalUnlessRequiredId<T>[]
    )
    console.log(`${result.insertedCount} documents inserted`)
  } finally {
    await client.close()
  }
}
