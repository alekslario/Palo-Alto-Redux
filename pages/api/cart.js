import connectDb from "../../utils/connectDb";
import Cart from "../../models/Cart";
import Product from "../../models/Product";
import withAuth from "../../utils/withAuth";
connectDb();

export default withAuth(async (req, res) => {
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
});

async function handleGetRequest(req, res) {
  const { userId } = req.user;
  try {
    const cart = await Cart.findOne({ user: userId }, { "products._id": 0 })
      .populate("cartProducts", "contentId")
      .lean();
    const { cartProducts, products } = cart;
    res.status(200).json({
      products: products.map((ele, index) => {
        ele["productId"] = ele.product;
        ele["contentId"] = cartProducts[index].contentId;
        return ele;
      })
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Error occurred. Try again later.");
  }
}

async function handlePutRequest(req, res) {
  const { payloadProducts } = req.body;
  const { userId } = req.user;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (cart.products.length > 60 || Object.keys(payloadProducts).length > 60)
      res.status(400).send("Maximum cart size reached");
    cart.products = cart.products
      .map(doc => {
        if (payloadProducts[doc.product]) {
          doc.quantity += payloadProducts[doc.product];
          delete payloadProducts[doc.product];
          if (doc.quantity === 0) return;
          return doc;
        }
      })
      .filter(ele => ele)
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
    res.status(500).json("Error occurred. Try again later.");
  }
}

async function handleDeleteRequest(req, res) {
  const { productId } = req.query;
  const { userId } = req.user;
  try {
    await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } }
    );
    res.status(200).send("Product deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error occurred. Try again later.");
  }
}
