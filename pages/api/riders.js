import { hashPassword, verifyPassword } from '../../lib/passwordHandler'
import { getSession } from 'next-auth/react'
const { connectToDatabase } = require('../../lib/mongodb')
import connectDB from '../../lib/connectDB'
import Riders from '../../models/riderModel'
import { v4 } from 'uuid'

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getRiders(req, res)
    }

    case 'POST': {
      return addRider(req, res)
    }
    //PUT is a method of modifying resource where the client sends data that updates the entire resource . PATCH is a method of modifying resources where the client sends partial data that is to be updated without modifying the entire data
    //case 'PUT': {
    //  return updateRider(req, res)
    //}

    case 'PATCH': {
      return updateRider(req, res)
    }
    case 'DELETE': {
      return deleteRider(req, res)
    }
  }
}

async function addRider(req, res) {
  connectDB()
  try {
    //Getting the body fields
    const {
      date,
      name,
      email,
      phoneNumber,
      haveMoto,
      havePermis,
      militaryFree,
      region,
      startingDate,
      password,
    } = JSON.parse(req.body)
    console.log('Rider : ', {
      date,
      name,
      email,
      phoneNumber,
      haveMoto,
      havePermis,
      militaryFree,
      region,
      startingDate,
      password,
    })
    // connect to the database
    let { db, client } = await connectToDatabase()

    //check for existing email
    const checkExistingMail = await db
      .collection('riders')
      .find({ email: email })
      .toArray()

    //check for existing phone
    const checkExistingPhoneNumber = await db
      .collection('riders')
      .find({
        phoneNumber: phoneNumber,
      })
      .toArray()

    if (checkExistingMail.length) {
      console.log('Email already exists : ', checkExistingMail[0].email)
      res.status(422).send({
        message: "E-mail de l'utilisateur existe déjà",
        success: false,
      })
      client.close()
      return
    }
    if (checkExistingPhoneNumber.length) {
      console.log(
        'Phone number already exists : ',
        checkExistingPhoneNumber[0].phoneNumber
      )
      res.status(422).send({
        message: "Le numéro de téléphone de l'utilisateur existe déjà",
        success: false,
      })
      client.close()
      return
    }
    const hashedPass = await hashPassword(password)
    // add the Rider and hashing the password
    //JSON.parse() takes a JSON string and transforms it into a JavaScript object.

    await db.collection('riders').insertOne({
      id: v4().toString(),
      date,
      name,
      email,
      phoneNumber,
      haveMoto,
      havePermis,
      militaryFree,
      region,
      startingDate,
      password: hashedPass,
    })

    // return a message
    return res.status(200).json({ message: 'Inscription avec succés !' })
  } catch (error) {
    // return an error
    console.log('ERORRRRRRRRRRRRRRRRRRR ! ', error)
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}

async function getRiders(req, res) {
  connectDB()
  try {
    // connect to the database
    // fetch the Riders
    let riders = await Riders.find({ name: 'rider 1' }).toArray()
    // return the Riders
    return res.json({
      message: riders,
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
  connectDB()
  try {
    const session = await getSession({ req: req })

    if (!session) {
      res.status(401).json({ message: 'Not authenticated!' })
      return
    }

    const userEmail = session.user.email
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    // connect to the database
    let { db, client } = await connectToDatabase()

    const rider = await Riders.findOne({ email: userEmail })
    if (!rider) {
      res.status(404).json({ message: 'User not found.' })
      client.close()
      return
    }

    //Check if the old password is correct
    const currentPassword = rider.password
    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

    if (!passwordsAreEqual) {
      res.status(403).json({ message: 'Invalid password.' })
      client.close()
      return
    }

    // update the published status of the Rider
    const hashedPassword = await hashPassword(newPassword)

    const result = await Riders.updateOne(
      { email: userEmail },
      { $set: { password: hashedPassword } }
    )

    client.close()
    res.status(200).json({ message: 'Password updated!' })
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}

async function deleteRider(req, res) {
  connectDB()
  try {
    // Connecting to the database
    let { db } = await connectToDatabase()

    // Deleting the Rider
    await db.collection('riders').deleteOne({})

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
