const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  let { db, client } = await connectToDatabase()

  const ads = await db
    .collection('categories')
    .find({}, { _id: 0, subCategories: 0 })
    .toArray()
  //return the ads as json
  res.status(200).json(ads)
}
