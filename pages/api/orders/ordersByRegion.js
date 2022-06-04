const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db, client } = await connectToDatabase()
    //get the category key from the request body
    const { region } = JSON.parse(req.body)

    const orders = await db
      .collection('orders')
      .find({ region: region }, { _id: false })
      .toArray()

    //return the orders as json
    res.status(200).json(orders)
  } else {
    res.status(404).json({
      error: 'not found',
    })
  }
}
