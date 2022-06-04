const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db, client } = await connectToDatabase()
    //get the search term entered from the user
    const { query } = JSON.parse(req.body)
    //pipelined search query
    let pipeline = [
      {
        $search: {
          index: 'products_search_index',
          text: {
            query: query,
            path: {
              wildcard: '*',
            },
            fuzzy: {},
          },
        },
      },
    ]

    const products = await db
      .collection('products')
      .aggregate(pipeline)
      .toArray()

    //return the products as json
    res.status(200).json(products)
  } else {
    res.status(404).json({
      error: 'not found',
    })
  }
}
