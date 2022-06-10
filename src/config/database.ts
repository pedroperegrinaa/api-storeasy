import 'dotenv/config'

export const connection = {
  url: process.env.MONGODB_URI || 'mongodb://localhost:27017/tsnode'
}
