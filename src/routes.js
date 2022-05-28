import { Router } from "express";
import CartsController from "./controllers/CartsController.js";
import TransactionsController from "./controllers/TransactionsController.js";

const routes = new Router();

routes.get("/carts", CartsController.index);
routes.post("/carts", CartsController.create);
routes.put("/carts/:id", CartsController.update);
routes.delete("/carts/:id", CartsController.delete);

routes.post("/transactions", TransactionsController.create);

export default routes;
