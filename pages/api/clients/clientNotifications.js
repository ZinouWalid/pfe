const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db, client } = await connectToDatabase()
    //get the category key from the request body
    const { clientId } = JSON.parse(req.body)

    const notifications = await db
      .collection('notifications')
      .find({ clientId: clientId }, { _id: false })
      .toArray()

    //return the notifications as json
    res.status(200).json(notifications)
  } else {
    res.status(404).json({
      error: 'not found',
    })
  }
}
