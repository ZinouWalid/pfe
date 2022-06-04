const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db, client } = await connectToDatabase()
    //get the category key from the request body
    const { pageNumber, nPerPage } = JSON.parse(req.body)

    const products = await db
      .collection('products')
      .find({}, { _id: false })
      .skip(pageNumber > 1 ? (pageNumber - 1) * nPerPage : 0)
      .limit(nPerPage)
      .toArray()

    //return the products as json
    res.status(200).json(products)
  } else {
    res.status(404).json({
      error: 'not found',
    })
  }
}
