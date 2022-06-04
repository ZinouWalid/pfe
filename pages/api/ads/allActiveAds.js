const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  let { db, client } = await connectToDatabase()

  const ads = await db
    .collection('ads')
    .find({ showed: true }, { _id: false })
    .toArray()
  //return the ads as json
  res.status(200).json(ads)
}
