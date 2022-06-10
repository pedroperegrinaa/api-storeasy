import { Schema, model, Document } from 'mongoose'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hashPassword: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default model('User', UserSchema)
