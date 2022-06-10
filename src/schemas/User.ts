import { Schema, model, Document } from 'mongoose'

interface User extends Document {
    name: string
    email: {
        type: string
        unique: true
    }
    hashPassword: string
}

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

export default model<User>('User', UserSchema)
