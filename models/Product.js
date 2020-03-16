import mongoose from "mongoose";

const { Number, String } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true
  },
  contentId: {
    type: String,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  reducedPrice: {
    type: Number,
    default: 0
  },
  reducedPriceExpiration: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Number,
    required: true
  }
});

// prettier-ignore
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
