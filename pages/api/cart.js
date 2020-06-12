import connectDb from "../../utils/connectDb";
import Cart from "../../models/Cart";
import User from "../../models/User";
import Product from "../../models/Product";
import withAuth from "../../utils/withAuth";
connectDb();

const isKey = (str) => /^[a-zA-Z0-9]{16,30}$/.test(str);

export default withAuth(async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
});

async function handleGetRequest(req, res) {
  const { userId } = req.user;
  try {
    const cart = await Cart.findOne({ user: userId }, { "products._id": 0 })
      .populate("user")
      .lean();
    const { products, user } = cart;
    const { name, surname, email, address, stripePaymentMethods } = user;
    res.status(200).json({
      user: {
        name,
        surname,
        email,
        address,
        stripePaymentMethods,
      },
      cart: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred. Try again later." });
  }
}

async function handlePostRequest(req, res) {
  const { payloadProducts } = req.body;
  const { userId } = req.user;
  if (Object.keys(payloadProducts) === 0) {
    res.status(200).json({ message: "No products found" });
  }
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart)
      return res.status(404).json({ message: "Error getting current user" });
    if (cart.products.length > 50 || Object.keys(payloadProducts).length > 50)
      res.status(400).json({ message: "Maximum cart size reached" });
    cart.products = cart.products
      .map((doc) => {
        if (payloadProducts[doc.productId]) {
          doc.quantity += payloadProducts[doc.productId].quantity;
          delete payloadProducts[doc.productId];
          if (!doc.quantity || doc.quantity <= 0) return;
        }
        return doc;
      })
      .concat(
        Object.entries(payloadProducts).map(([key, { quantity, contentId }]) =>
          quantity > 0 && isKey(key) && isKey(contentId)
            ? {
                quantity,
                contentId,
                productId: key,
              }
            : null
        )
      )
      .filter((ele) => ele);
    await cart.save();
    res.status(200).json({
      message: "Cart updated",
      cart: cart.products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred. Try again later." });
  }
}

async function handleDeleteRequest(req, res) {
  const { productId } = req.query;
  const { userId } = req.user;
  try {
    await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { productId } } }
    );
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred. Try again later." });
  }
}
