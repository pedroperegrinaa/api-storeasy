import { Router } from 'express'
import CartsController from './controllers/CartController.js'
import TransactionsController from './controllers/TransactionController.js'
import PostbackController from './controllers/PostbackController.js'
import ClientsController from './controllers/ClientController.js'
import CreditCardController from './controllers/CreditCardController.js'
import TokenController from './controllers/TokenController.js'

const routes = new Router()

routes.get('/carts', CartsController.index)
routes.post('/carts', CartsController.create)
routes.put('/carts/:id', CartsController.update)
routes.delete('/carts/:id', CartsController.delete)

routes.post('/tokens', TokenController.store)

/* PAGARME ROUTES */

routes.post('/transactions', TransactionsController.create)

routes.post('/postbacks/pagarme', PostbackController.pagarme)

routes.get('/clients', ClientsController.index)
routes.post('/clients', ClientsController.create)

routes.post('/creditcard', CreditCardController.create)

export default routes
