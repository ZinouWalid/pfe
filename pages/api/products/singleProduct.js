const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db, client } = await connectToDatabase()
    //get the category key from the request body
    const { productId } = JSON.parse(req.body)

    const product = await db
      .collection('products')
      .findOne({ id: productId }, { _id: false })

    //return the product as json
    res.status(200).json(product)
  } else {
    res.status(404).json({
      error: 'not found',
    })
  }
}
