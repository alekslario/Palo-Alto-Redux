import Stripe from "stripe";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import Order from "../../models/Order";
import { addAddress } from "./account";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { paymentIntentId, saveEmail = false, cartItems } = req.body;
  const { authorization = null } = req.headers;

  try {
    const [paymentIntent, cart] = await Promise.all([
      stripe.paymentIntents.retrieve(paymentIntentId),
      authorization ? retrieveCart(authorization) : {},
    ]);
    const {
      metadata: { shippingCost, ...metadata },
      charges: {
        data: [
          {
            amount,
            receipt_url,
            receipt_email,
            payment_method_details: { card },
          },
        ],
      },
      shipping: {
        address: { city, country, line1, line2, postal_code },
        name: fullName,
      },
      payment_method,
      status,
    } = paymentIntent;

    if (status !== "succeeded") {
      return res.status(500).json({ message: "Error processing charge" });
    }

    const productsMetadata = Object.values(metadata)
      .filter((x) => x)
      .reduce((acc, ele) => {
        ele
          .split(";")
          .filter((x) => x)
          .forEach((item) => {
            const [productId, quantity, price] = item.split(/[-$]/);
            acc.push({
              productId,
              quantity: parseInt(quantity),
              contentId: cartItems[productId].contentId,
              price: parseInt(price),
            });
          });
        return acc;
      }, []);

    const { user = null } = cart;

    const [order] = await Promise.all([
      new Order({
        stripeIntentId: paymentIntentId,
        ...(user ? { user: user._id } : {}),
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
      }).save(),
      ...(user
        ? [
            updateUser(req, user, payment_method, card),
            updateCart(user, cart, productsMetadata),
          ]
        : []),
    ]);
    const { name, surname, email, stripePaymentMethods, address } = user || {};

    res.status(200).json({
      orderId: order.id,
      ...(user
        ? {
            cart: cart.products.reduce(
              (acc, { productId, quantity, contentId }) => (
                (acc[productId] = { quantity, contentId }), acc
              ),
              {}
            ),
            user: { name, surname, email, stripePaymentMethods, address },
          }
        : {}),
    });
    //here we trigger webhook to send emails etc...Leaving empty for now.
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing charge" });
  }
};

async function retrieveCart(authorization) {
  const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
  const cart = await Cart.findOne({ user: userId })
    .populate("cartProducts")
    .populate("user");
  return cart;
}

async function updateCart(user, cart, productsMetadata) {
  if (user) {
    //clear cart if logged in
    const productsMap = productsMetadata.reduce(
      (acc, { productId, quantity }) => {
        acc[productId] = quantity;
        return acc;
      },
      {}
    );
    cart.products = cart.products
      .map((ele) => ((ele.quantity -= productsMap[ele.productId] || 0), ele))
      .filter((ele) => !!ele.quantity && ele.quantity > 0);
    await cart.save();
  }
}

const updateUser = async (req, user, payment_method, card) => {
  const { savePaymentMethod = false, saveShipping = false } = req.body;
  if (savePaymentMethod) {
    saveCard(user, savePaymentMethod, payment_method, card);
  }
  if (saveShipping) {
    trySaveAddress(req, user);
  }
  if (savePaymentMethod || saveShipping) {
    await user.save();
  }
};

async function saveCard(user, savePaymentMethod, payment_method, card) {
  const { brand, exp_month, exp_year, last4 } = card;

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
  }
}

const trySaveAddress = (req, user) => {
  //do not want to throw an error and interrupt checkout process, a customer can be notified later
  const resMock = {
    status: () => ({
      json: (res) => {
        console.log("error", res);
      },
    }),
  };
  try {
    addAddress(req, resMock, user);
  } catch (error) {
    console.log("Failed saving address: ", error);
  }
};
