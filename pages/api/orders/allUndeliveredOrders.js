const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  let { db, client } = await connectToDatabase()

  const orders = await db
    .collection('orders')
    .find({ state: 1 }, { _id: false })
    .toArray()
    
  //return the orders as json
  res.status(200).json(orders)
}
