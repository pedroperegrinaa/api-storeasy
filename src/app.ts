import express from 'express'
import cors from 'cors'
import routes from './routes.js'

import 'dotenv/config'
import './database'

import SwaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

class App {
  public server: express.Application

  constructor () {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.server.use(express.json())
    this.server.use(cors())
    this.server.use(
      '/doc',
      SwaggerUi.serve,
      SwaggerUi.setup(swaggerDocument, { explorer: true })
    )
  }

  routes () {
    this.server.use(routes)
  }
}

export default new App().server
