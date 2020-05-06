import Stripe from "stripe";
import connectDb from "../../utils/connectDb";
import jwt from "jsonwebtoken";
import Product from "../../models/Product";
import User from "../../models/User";
import { createClient } from "contentful-management";

connectDb();

const contentfulClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { cart, total, shipping } = req.body;
      const { authorization } = req.headers;

      // safeguard vs price manipulation client side
      const [itemsCost, shippingCost] = await Promise.all([
        calculateTotal(cart),
        findShippingCost(shipping),
      ]);
      const amount = itemsCost + shippingCost;
      if (total !== amount) {
        console.log("amount doesnt match", total, amount);
        return res
          .status(500)
          .json({ statusCode: 500, message: "Error processing charge" });
      }

      const paymentIntent = authorization
        ? await handleAuthorizedCustomer(res, amount, authorization)
        : await handleAnonymousCustomer(amount);

      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
async function findShippingCost(shipping) {
  if (!shipping) return 0;
  const { region } = shipping;
  const space = await contentfulClient.getSpace(
    process.env.CONTENTFUL_SPACE_ID
  );
  const env = await space.getEnvironment("master");
  const entry = await env.getEntry("6mmntvUQIWMkIhHprUOxmd");
  const plainObject = entry.fields.shippingPricing["en-US"];
  return (plainObject[region] || plainObject["International"]).find(
    ({ name }) => name === shipping.name
  ).price;
}
async function calculateTotal(cart) {
  const ids = Object.keys(cart);
  const records = await Product.find().where("productId").in(ids).exec();
  return records.reduce((acc, product) => {
    //check if the price is reduced
    acc +=
      (new Date().getTime() < product.reducedPriceExpiration
        ? product.reducedPrice
        : product.price) * cart[product.productId].quantity;
    return acc;
  }, 0);
}

async function handleAuthorizedCustomer(res, amount, authorization) {
  let unHashed = null;
  try {
    unHashed = jwt.verify(authorization, process.env.JWT_SECRET);
  } catch (error) {
    return res
      .status(403)
      .json({ statusCode: 403, message: "Please login again" });
  }
  const { userId } = unHashed;

  const user = await User.findOne({ id: userId });
  const customer = user.stripeId || (await stripe.customers.create()).id;
  return await stripe.paymentIntents.create({
    customer,
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
}

async function handleAnonymousCustomer(amount) {
  return await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
}
