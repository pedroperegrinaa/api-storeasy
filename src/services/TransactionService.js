import Cart from "../models/Cart";
import { v4 as uuidv4 } from "uuid";
import Transaction from "../models/Transaction";
import PagarMeProvider from "../../providers/PagarMeProvider";

class TransactionService {
  paymentProvider;

  constructor(paymentProvider) {
    this.paymentProvider = paymentProvider || new PagarMeProvider();
  }

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
      code: await uuidv4(),
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

    // console.log(items);

    this.paymentProvider.process({
      transactionCode: transaction.code,
      total: transaction.total,
      paymentType,
      installments,
      creditCard,
      costumer,
      billing,
    });

    return transaction;
  }
}

export default TransactionService;
