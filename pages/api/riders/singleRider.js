const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db, client } = await connectToDatabase()
    //get the category key from the request body
    const { riderId } = JSON.parse(req.body)

    const rider = await db
      .collection('riders')
      .findOne({ id: riderId }, { _id: false })

    //return the rider as json
    res.status(200).json(rider)
  } else {
    res.status(404).json({
      error: 'not found',
    })
  }
}
