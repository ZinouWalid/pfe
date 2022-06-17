const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db, client } = await connectToDatabase()
    //get the category key from the request body
    const { productId, units } = JSON.parse(req.body)
    console.log('Product Body : ', JSON.parse(req.body))
    const product = await db
      .collection('products')
      .updateOne({ id: productId }, { $set: { units: units } })

    //return the product as json
    res.status(200).json(product)
  } else {
    res.status(404).json({
      error: 'not found',
    })
  }
}
