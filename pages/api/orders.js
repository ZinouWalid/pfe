const { connectToDatabase } = require('../../lib/mongodb')
import { v4 } from 'uuid'
const ObjectId = require('mongodb').ObjectId

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getOrders(req, res)
    }

    case 'POST': {
      return addOrder(req, res)
    }

    case 'PUT': {
      return updateOrder(req, res)
    }

    case 'DELETE': {
      return deleteOrder(req, res)
    }
  }
}

async function addOrder(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase()
    // add the Order
    await db
      .collection('orders')
      .insertOne({ id: v4().toString(), ...JSON.parse(req.body) })
    // return a message
    return res.json({
      message: 'Order added successfully',
      success: true,
    })
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}

async function getOrders(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase()
    // fetch the Orders
    let Orders = await db
      .collection('Orders')
      .find({})
      .sort({ published: -1 })
      .toArray()
    // return the Orders
    return res.json({
      message: JSON.parse(JSON.stringify(Orders)),
      success: true,
    })
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}

async function updateOrder(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase()

    // update the published status of the Order
    await db.collection('Orders').updateOne(
      {
        _id: new ObjectId(req.body),
      },
      { $set: { published: true } }
    )

    // return a message
    return res.json({
      message: 'Order updated successfully',
      success: true,
    })
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}

async function deleteOrder(req, res) {
  try {
    // Connecting to the database
    let { db } = await connectToDatabase()

    // Deleting the Order
    await db.collection('Orders').deleteOne({
      _id: new ObjectId(req.body),
    })

    // returning a message
    return res.json({
      message: 'Order deleted successfully',
      success: true,
    })
  } catch (error) {
    // returning an error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}
