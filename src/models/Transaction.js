import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    cartCode: {
      type: String,
      required: true,
      unique: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: [
        "started",
        "processing",
        "pendding",
        "approved",
        "refused",
        "refunded",
        "chargeback",
        "error",
      ],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["billet", "credit_card"],
      required: true,
    },
    installments: {
      type: Number,
    },
    total: {
      type: Number,
    },
    transactionId: {
      type: String,
    },
    processResponse: {
      type: String,
    },
    costumerEmail: {
      type: String,
    },
    costumerName: {
      type: String,
    },
    costumerMobile: {
      type: String,
    },
    costumerDocument: {
      type: String,
    },
    billingAddress: {
      type: String,
    },
    billingNumber: {
      type: String,
    },
    billingNeighborhood: {
      type: String,
    },
    billingCity: {
      type: String,
    },
    billingState: {
      type: String,
    },
    billingZipCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transaction", schema);
