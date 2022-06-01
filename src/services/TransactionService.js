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

    const response = await this.paymentProvider.process({
      transactionCode: transaction.code,
      total: transaction.total,
      paymentType,
      installments,
      creditCard,
      costumer,
      billing,
    });

    await transaction.updateOne({
      transactionId: response.transactionId,
      status: response.status,
      processorResponse: response.processorResponse,
    });

    return transaction;
  }

  async updateStatus({ code, providerStatus }) {
    const transaction = await Transaction.findOne({ code });

    if (!transaction) {
      throw `Transaction ${code} was not found.`;
    }
    const status = await this.paymentProvider.translateStatus(providerStatus);

    if (!status) {
      throw `Status ${providerStatus} was not found.`;
    }

    await transaction.updateOne({ status });
  }
}

export default TransactionService;
