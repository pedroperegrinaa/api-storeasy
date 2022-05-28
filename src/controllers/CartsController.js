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
  }

  async create(req, res) {
    console.log("create");
    try {
      const { code, price } = req.body;
      const cart = await Cart.create({ code, price });
      console.log(cart);
      return res.status(201).json(cart);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async update(req, res) {
    console.log("update");
    const { id } = req.params;
    const { code, price } = req.body;

    if (!id) {
      console.log(id);
      return res.status(400).json({ error: "Missing id." });
    }

    try {
      const cart = await Cart.findById(id);

      if (!cart) {
        return res.status(400).json({ error: "Carrinho não existe." });
      } else {
        cart.updateOne({ code, price });
      }

      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async delete(req, res) {
    console.log("delete");

    const { id } = req.params;

    if (!id) {
      console.log(id);
      return res.status(400).json({ error: "Missing id." });
    }

    try {
      const cart = await Cart.findById(id);

      if (!cart) {
        return res.status(400).json({ error: "Carrinho não existe." });
      } else {
        cart.deleteOne();
      }

      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}

export default new CartsController();
