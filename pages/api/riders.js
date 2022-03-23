const { connectToDatabase } = require('../../lib/mongodb')
const ObjectId = require('mongodb').ObjectId

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getRiders(req, res)
    }

    case 'POST': {
      return addRider(req, res)
    }

    case 'PUT': {
      return updateRider(req, res)
    }

    case 'DELETE': {
      return deleteRider(req, res)
    }
  }
}

async function addRider(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase()
    // add the Rider
    await db.collection('Riders').insertOne(JSON.parse(req.body))
    // return a message
    return res.json({
      message: 'Rider added successfully',
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

async function getRiders(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase()
    // fetch the Riders
    let Riders = await db
      .collection('Riders')
      .find({ name: 'rider 1' })
      .toArray()
    // return the Riders
    return res.json({
      message: Riders /*JSON.parse(JSON.stringify(Riders))*/,
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

async function updateRider(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase()

    // update the published status of the Rider
    await db.collection('Riders').updateOne(
      {
        _id: new ObjectId(req.body),
      },
      { $set: { published: true } }
    )

    // return a message
    return res.json({
      message: 'Rider updated successfully',
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

async function deleteRider(req, res) {
  try {
    // Connecting to the database
    let { db } = await connectToDatabase()

    // Deleting the Rider
    await db.collection('Riders').deleteOne({
      _id: new ObjectId(req.body),
    })

    // returning a message
    return res.json({
      message: 'Rider deleted successfully',
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
