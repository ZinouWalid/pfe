import mongoose from 'mongoose'

const riderSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  date: {
    type: Date,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  haveMoto: {
    type: Boolean,
  },
  havePermis: {
    type: Boolean,
  },
  militaryFree: {
    type: Boolean,
  },
  region: {
    type: String,
  },
  startingDate: {
    type: Date,
  },
  password: {
    type: String,
  },
})

const Dataset = mongoose.models.riders || mongoose.model('riders', riderSchema)
export default Dataset