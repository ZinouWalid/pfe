const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db, client } = await connectToDatabase()
    //get the category key from the request body
    const { category, page } = JSON.parse(req.body)

    //Get only the first 20 products of the category to implement the infinite scroll
    const products = await db
      .collection('products')
      .find({ category: category }, { _id: false })
      .skip((page - 1) * 10)
      .limit(10)
      .toArray()

    //return the products as json
    res.status(200).json(products)
  } else {
    res.status(404).json({
      error: 'not found',
    })
  }
}
