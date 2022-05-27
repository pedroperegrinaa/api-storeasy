import Cart from "../models/Cart";

class CartsController {
  async index(req, res) {
    console.log("index");
    try {
      const carts = await Cart.find();
      return res.status(200).json(carts);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }

    return res.status(200).json({ message: "Hello World" });
  }

  async create(req, res) {
    console.log("create");
    try {
      const { code, price } = req.body;
      const cart = await Cart.create({ code, price });
      return res.status(201).json(cart);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}

export default new CartsController();
