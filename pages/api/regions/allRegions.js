const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  let { db, client } = await connectToDatabase()

  const regions = await db
    .collection('wilayas')
    .find({}, { _id: false })
    .sort({ id: 1 })
    .toArray()
  //return the regions as json
  res.status(200).json(regions)
}
