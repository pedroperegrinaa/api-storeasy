import Cart from "../models/Cart";

class CartsController {
  async index(req, res) {
    console.log("index");
    try {
      const carts = await Cart.find();
      return res.status(200).json(carts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
      return res.status(500).json({ error: error.message });
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
      let cart = await Cart.findById(id);
      console.log(cart);

      if (!cart) {
        return res.status(400).json({ error: "Carrinho não existe." });
      } else {
        console.log({ code, price });
        cart = await Cart.findByIdAndUpdate(id, { code, price }, { new: true });

        console.log(cart);
        return res.status(200).json(cart);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
      console.log("aaa");

      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new CartsController();
