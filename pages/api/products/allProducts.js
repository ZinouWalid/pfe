const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  let { db, client } = await connectToDatabase()

  const products = await db
    .collection('products')
    .find({}, { _id: false })
    .toArray()
  //return the products as json
  res.status(200).json(products)
}
