import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
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
  password: {
    type: String,
  },
})

const Dataset =
  mongoose.models.clients || mongoose.model('clients', clientSchema)
export default Dataset
