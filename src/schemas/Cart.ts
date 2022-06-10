import mongoose from 'mongoose'

interface IUser extends Document {
  code: {
    type: string
    required: true
    unique: true
  }
  price: {
    type: number
    required: true
  }
}
const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IUser>('Cart', schema)
