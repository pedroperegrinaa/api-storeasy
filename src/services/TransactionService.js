import Cart from "../models/Cart";
import Transaction from "../models/Transaction";

class TransactionService {
  async process({
    cartCode,
    paymentType,
    installments,
    costumer,
    billing,
    creditCard,
  }) {
    const cart = await Cart.findOne({ code: cartCode });
    if (!cart) {
      throw `Cart ${cartCode} was not found.`;
    }

    const transaction = await Transaction.create({
      cartCode: cart.code,
      code: "abc123",
      total: cart.price,
      paymentType,
      installments,
      status: "started",
      costumerName: costumer.name,
      costumerEmail: costumer.email,
      costumerMobile: costumer.mobile,
      costumerDocument: costumer.document,
      billingAddress: billing.address,
      billingNumber: billing.number,
      billingNeighborhood: billing.neighborhood,
      billingCity: billing.city,
      billingState: billing.state,
      billingZipCode: billing.zipCode,
    });
    return transaction;
  }
}

export default TransactionService;
