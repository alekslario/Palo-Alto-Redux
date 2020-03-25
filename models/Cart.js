import mongoose from "mongoose";

const { ObjectId, Number } = mongoose.Schema.Types;

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User"
    },
    products: [
      {
        quantity: {
          type: Number,
          default: 1
        },
        product: {
          type: String,
          ref: "Product"
        }
      }
    ]
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CartSchema.virtual("cartProducts", {
  ref: "Product",
  localField: "products.product",
  foreignField: "productId",
  justOne: false
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
