const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  let { db, client } = await connectToDatabase()

  const riders = await db
    .collection('riders')
    .find({}, { _id: false })
    .toArray()
  //return the riders as json
  res.status(200).json(riders)
}
