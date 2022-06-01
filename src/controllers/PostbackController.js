import Transaction from "../models/Transaction";

import TransactionService from "../services/TransactionService";

class PostbackController {
  async pagarme(req, res) {
    const { id, object, current_status } = req.body;

    // pagarme.postback.verifySignature(
    //   "api_key",
    //   "postbackBody",
    //   "X-Hub-Signature"
    // );

    try {
      if (object === "transaction") {
        const transaction = await Transaction.findOne({ transaction: id });

        if (!transaction) {
          return res.status(404);
        }

        const service = new TransactionService();

        await service.updateStatus({
          code: transaction.code,
          providerStatus: current_status,
        });

        return res.status(200).json(service);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new PostbackController();
