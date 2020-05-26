import mongoose from "mongoose";

const { ObjectId, Number, String } = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema(
  {
    stripeIntentId: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    products: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        productId: {
          type: String,
          ref: "Product",
        },
      },
    ],
    email: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
    },
    shipping: {
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      line1: {
        type: String,
        required: true,
      },
      line2: {
        type: String,
        required: false,
      },
      postal_code: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// prettier-ignore
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
