import { Router } from 'express'
import CartsController from './controllers/CartController'
import TransactionsController from './controllers/TransactionController'
import PostbackController from './controllers/PostbackController'
import ClientsController from './controllers/ClientController'
import CreditCardController from './controllers/CreditCardController'
import TokenController from './controllers/TokenController'
import UserController from './controllers/UserController'

const routes = new Router()

routes.get('/carts', CartsController.index)
routes.post('/carts', CartsController.create)
routes.put('/carts/:id', CartsController.update)
routes.delete('/carts/:id', CartsController.delete)

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

routes.post('/tokens', TokenController.store)

/* PAGARME ROUTES */

routes.post('/transactions', TransactionsController.create)

routes.post('/postbacks/pagarme', PostbackController.pagarme)

routes.get('/clients', ClientsController.index)
routes.post('/clients', ClientsController.create)

routes.post('/creditcard', CreditCardController.create)

export default routes
