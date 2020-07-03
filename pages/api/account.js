import Stripe from "stripe";
import User from "../../models/User";
import Order from "../../models/Order";
import Cart from "../../models/Cart";
import connectDb from "../../utils/connectDb";
import withAuth from "../../utils/withAuth";
import isLength from "validator/lib/isLength";
const { getName } = require("country-list");
connectDb();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
  const { includeOrders } = req.query;
  try {
    //fetching up to 6 month old orders
    const [orders, user, cart] = await Promise.all([
      includeOrders
        ? Order.find(
            {
              user: userId,
              createdAt: { $gt: new Date(Date.now() - 86400000 * 30 * 6) },
            },
            { user: 0, stripeIntentId: 0, "products._id": 0 }
          ).lean()
        : [],
      User.findOne({ _id: userId }).lean(),
      Cart.findOne(
        { user: userId },
        { "products._id": 0, user: 0, _id: 0 }
      ).lean(),
    ]);
    if (user) {
      const { name, surname, email, stripePaymentMethods, address } = user;
      res.status(200).json({
        user: {
          name,
          surname,
          email,
          stripePaymentMethods,
          address,
        },
        orders,
        cart: cart.products.reduce(
          (acc, { productId, quantity, contentId }) => (
            (acc[productId] = { quantity, contentId }), acc
          ),
          {}
        ),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function handlePostRequest(req, res) {
  try {
    const { userId } = req.user;

    const user = await User.findOne({ _id: userId });
    if (user) {
      [addAddress].forEach((f) => f(req, res, user));
      await user.save();
      const { address } = user;
      if (!res.headersSent) res.status(201).json({ address });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function handleDeleteRequest(req, res) {
  const { userId } = req.user;
  const { addressId } = req.body;
  try {
    if (addressId) {
      const { address } = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { address: { _id: addressId } } },
        { new: true }
      );
      res.status(200).json({ address });
    } else {
      // usually better to set status active without deleting in production
      // but for debugging purposes we delete all traces here apart from Orders
      const [user] = await Promise.all([
        User.findByIdAndDelete({ _id: userId }),
        Cart.findOneAndDelete({ user: userId }),
      ]);
      await stripe.customers.del(user.stripeId);
      res.status(200).json({ message: "Done!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}
export function addAddress(req, res, user) {
  const { shipAddress } = req.body;
  if (shipAddress) {
    const {
      _id,
      name = "",
      surname = "",
      country = "",
      city = "",
      postcode = "",
      address = "",
      addressOptional = "",
      province = "",
      phone = "",
      setDefault,
    } = shipAddress;
    const errors = [];
    [
      [{ city }, { min: 2, max: 40 }],
      [{ name }, { min: 2, max: 40 }],
      [{ surname }, { min: 2, max: 40 }],
      [{ address }, { min: 4, max: 160 }],
      [{ addressOptional }, { max: 160 }],
      [{ province }, { max: 30 }],
      [{ phone }, { max: 65 }],
      [{ postcode }, { min: 4, max: 40 }],
    ].forEach(([val, { min = 0, max }]) => {
      const [key, value] = Object.entries(val)[0];
      if (!isLength(value, { min, max })) {
        console.log(key, value, min, max, val);
        const name = key.charAt(0).toUpperCase() + key.substring(1);
        errors.push({
          [key]:
            min > 0
              ? `${name} must be ${min}-${max} characters long`
              : `${name} should be maximum ${max} characters long`,
        });
      }
    });
    if (!getName(country)) errors.push({ country: "Invalid country code" });
    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }
    const shippingAddress = {
      name,
      surname,
      country,
      city,
      postcode,
      address,
      addressOptional,
      province,
      phone,
    };
    if (_id) {
      if (setDefault) {
        user.address = [
          shippingAddress,
          ...user.address.filter((el) => el.id !== _id),
        ];
      } else {
        const addressObject = user.address.id(_id);
        Object.assign(addressObject, shippingAddress);
      }
    } else {
      if (user.address.length > 4)
        return res.status(422).json({
          message: "You've reached the limit of 5 addresses per account",
        });
      if (setDefault) {
        user.address.unshift(shippingAddress);
      } else {
        user.address.push(shippingAddress);
      }
    }
    return user;
  } else {
    return user;
  }
}
