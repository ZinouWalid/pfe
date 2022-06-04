const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db, client } = await connectToDatabase()
    //get the category key from the request body
    const { categoryId } = JSON.parse(req.body)

    const category = await db
      .collection('categories')
      .findOne({ key: categoryId }, { _id: false })

    //return the category as json
    res.status(200).json(category)
  } else {
    res.status(404).json({
      message: 'This route is only available via POST',
    })
  }
}
