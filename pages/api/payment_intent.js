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
      const { cart, total, shipping = null, intentId = null } = req.body;
      const { authorization } = req.headers;
      // safeguard vs price manipulation client side
      if (Object.keys(cart) > 50) {
        return res.status(500).json({
          statusCode: 500,
          message: "Only 50 items per shopping cart allowed.",
        });
      }
      const [[itemsCost, cartSummary], shippingCost] = await Promise.all([
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
      const metadata = {
        shippingCost,
        ...cartSummary.split(" ").reduce((acc, ele, index) => {
          acc[index] = ele;
          return acc;
        }, {}),
      };

      const paymentIntent = intentId
        ? await updatePaymentIntent(amount, intentId, metadata)
        : authorization
        ? await handleAuthorizedCustomer(res, amount, authorization, metadata)
        : await handleAnonymousCustomer(amount, metadata);

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
  return records.reduce(
    (acc, product, index) => {
      //check if the price is reduced
      acc[0] +=
        (new Date().getTime() < product.reducedPriceExpiration
          ? product.reducedPrice
          : product.price) * cart[product.productId].quantity;
      //adding empty space after so it would easier to split later//metadata max character count is 500
      acc[1] += `${product.productId}-${cart[product.productId].quantity};${
        index % 15 === 0 ? " " : ""
      }`;
      return acc;
    },
    [0, ""]
  );
}

async function handleAuthorizedCustomer(res, amount, authorization, metadata) {
  let unHashed = null;
  try {
    unHashed = jwt.verify(authorization, process.env.JWT_SECRET);
  } catch (error) {
    return res
      .status(403)
      .json({ statusCode: 403, message: "Please login again" });
  }
  const { userId } = unHashed;
  const user = await User.findOne({ _id: userId });
  return await stripe.paymentIntents.create({
    customer: user.stripeId,
    metadata,
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
}

async function updatePaymentIntent(amount, intentId, metadata) {
  return await stripe.paymentIntents.update(intentId, {
    metadata,
    amount,
  });
}

async function handleAnonymousCustomer(amount, metadata) {
  console.log("anonimous customer");
  return await stripe.paymentIntents.create({
    amount,
    metadata,
    currency: "usd",
    payment_method_types: ["card"],
  });
}
