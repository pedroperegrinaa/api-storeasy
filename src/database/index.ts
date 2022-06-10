import mongoose from 'mongoose'

import { connection } from '../config/database'

class Database {
  constructor () {
    this.mongo()
  }

  mongo () {
    mongoose.connect(connection.url, {
      // useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
}

export default new Database()
