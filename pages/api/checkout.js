import Stripe from "stripe";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import Order from "../../models/Order";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { paymentIntentId, savePaymentMethod = false } = req.body;
  const { authorization } = req.headers;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const {
      metadata: { shippingCost, ...rest },
      charges: { data },
      shipping: {
        address: { city, country, line1, line2, postal_code },
        name: fullName,
      },
      payment_method,
      status,
    } = paymentIntent;

    if (status !== "succeeded") {
      return res.status(500);
    }

    const {
      amount,
      payment_method_details: {
        receipt_email,
        card: { brand, exp_month, exp_year, last4 },
      },
    } = data[0];

    const productsMetadata = Object.keys(rest).reduce((acc, ele) => {
      ele
        .split(";")
        .filter((x) => x)
        .forEach((item) => {
          const [productId, quantity] = item.split("-");
          acc.push({
            productId,
            quantity: parseInt(quantity),
          });
        });
    }, []);

    let cart = {};
    if (authorization) {
      const { userId } = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      cart = await Cart.findOne({ user: userId })
        .populate("cartProducts")
        .populate("user");
    }
    const { user, products } = cart;

    await new Order({
      stripeIntentId: paymentIntentId,
      user: user ? user._id : "",
      email: receipt_email,
      total: amount,
      shippingCost,
      shipping: {
        city,
        country,
        line1,
        line2,
        postal_code,
        name: fullName,
      },
      products: productsMetadata,
    }).save();
    console.log("user", user);
    if (user && savePaymentMethod) {
      const exist = user.stripePaymentMethods.find(
        (method) => method.payment_method === payment_method
      );
      if (!exist) {
        user.stripePaymentMethods.push({
          payment_method,
          brand,
          exp_month,
          exp_year,
          last4,
        });
      }
      await user.save();
    }

    if (user) {
      //clear cart
      const productsMap = productsMetadata.reduce(
        (acc, { product, quantity }) => {
          acc[product] = quantity;
          return acc;
        },
        {}
      );

      console.log("server cart", products);
      // const [currentCart, return ] = cart.products.filter(ele=>productsMap[ele]);
      cart.products = cart.products.filter((ele) => productsMap[ele.productId]);
      await cart.save();
    }
    const { name, surname, email, stripePaymentMethods } = user;
    res.status(200).json({
      cart: cart.products,
      user: { name, surname, email, stripePaymentMethods },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing charge");
  }
};
