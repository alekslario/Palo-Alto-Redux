import connectDb from "../../utils/connectDb";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

async function handleGetRequest(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOne({ user: userId })
      .populate("cartProducts")
      .lean();

    res.status(200).json(cart.cartProducts);
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again");
  }
}

async function handlePutRequest(req, res) {
  const { payloadProducts } = req.body;
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const cart = await Cart.findOne({ user: userId });
    if (cart.products.length > 60 || Object.keys(payloadProducts).length > 60)
      res.status(400).send("Maximum cart size reached");
    cart.products = cart.products
      .map(doc => {
        if (payloadProducts[doc.product]) {
          doc.quantity += payloadProducts[doc.product];
          delete payloadProducts[doc.product];
          return doc;
        }
      })
      .concat(
        Object.entries(payloadProducts).map(([key, value]) => ({
          quantity: value,
          product: key
        }))
      );
    await cart.save();
    res.status(200).send("Cart updated");
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again");
  }
}

async function handleDeleteRequest(req, res) {
  const { productId } = req.query;
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } }
    );
    res.status(200).send("Product deleted");
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again");
  }
}
