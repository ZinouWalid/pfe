import mongoose from 'mongoose'

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already Connected !')
    return
  }

  mongoose.connect(process.env.MONGO_URI, {}, (error) => {
    if (error) throw error
    console.log('Connected Successfully !!!')
  })
}

export default connectDB
