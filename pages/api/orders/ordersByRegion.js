const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db, client } = await connectToDatabase()
    //get the category key from the request body
    const { region } = JSON.parse(req.body)

    //get only the non delivered orders
    const orders = await db
      .collection('orders')
      .find({ region: region, state: 1 }, { _id: false })
      .toArray()

    //return the orders as json
    res.status(200).json(orders)
  } else {
    res.status(404).json({
      error: 'not found',
    })
  }
}
