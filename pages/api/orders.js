const { connectToDatabase } = require('../../lib/mongodb')
import { v4 } from 'uuid'

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getOrders(req, res)
    }

    case 'POST': {
      return addOrder(req, res)
    }

    case 'PATCH': {
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
    //state : 1 => ready , 2 => in progress , 3 => delivered
    await db
      .collection('orders')
      .insertOne({ id: v4().toString(), ...JSON.parse(req.body), state: 1 })
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
      .collection('orders')
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
    const { id, clientId, riderId, riderName } = JSON.parse(req.body)

    // connect to the database
    let { db } = await connectToDatabase()

    // update the state of the Order
    //state : 1 => ready , 2 => in progress , 3 => delivered
    await db.collection('orders').updateOne(
      {
        id: id,
      },
      { $set: { state: 2 } }
    )

    //notify the client
    await db.collection('notifications').insertOne({
      id: v4().toString(),
      clientId: clientId,
      riderId: riderId,
      riderName: riderName,
      message: 'Votre commande a été acceptée par ' + riderName,
      date: new Date(),
    })
    // return a message
    console.log('Order updated successfully : ', id)
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
    const { id } = JSON.parse(req.body)

    // Connecting to the database
    let { db } = await connectToDatabase()

    // Deleting the Order
    await db.collection('orders').deleteOne({
      id: id,
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
