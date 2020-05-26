import Stripe from "stripe";
import User from "../../models/User";
import Cart from "../../models/Cart";
import connectDb from "../../utils/connectDb";
import withAuth from "../../utils/withAuth";
import isLength from "validator/lib/isLength";
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
  try {
    const user = await User.findOne({ _id: userId });
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
      });
    } else {
      res.status(404).json({ status: 404, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Server error" });
  }
}

async function handlePostRequest(req, res) {
  try {
    const { userId } = req.user;
    const user = await User.findOne({ _id: userId });
    if (user) {
      [addAddress].forEach((f) => f(req, res, user));
      await user.save();
      res.status(201).json({ status: 201, message: "Account updated" });
    } else {
      res.status(404).json({ status: 404, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Server error" });
  }
}

async function handleDeleteRequest(req, res) {
  const { userId } = req.user;
  const { addressId } = req.body;
  try {
    if (addressId) {
      const addresses = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { address: { _id: addressId } } },
        { new: true }
      );
      res.status(200).json({ status: 200, addresses });
    } else {
      const user = await User.findByIdAndDelete({ _id: userId });
      await Cart.findByIdAndDelete({ user: userId });
      await stripe.customers.del(user.stripeId);
      res.status(200).json({ status: 200 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Server error" });
  }
}
function addAddress(req, res, user) {
  const { shipAddress } = req.body;
  if (shipAddress) {
    const {
      id,
      country = "",
      city = "",
      postcode = "",
      address = "",
      addressOptional = "",
      province = "",
      phone = "",
    } = shipAddress;

    if (!isLength(city, { min: 2, max: 40 })) {
      return res.status(422).send("City must be 2-40 characters long");
    } else if (!isLength(address, { min: 4, max: 160 })) {
      return res.status(422).send("Address must be 4-160 characters long");
    } else if (!isLength(addressOptional, { max: 160 })) {
      return res
        .status(422)
        .send("Address(optional) should be maximum 160 characters long");
    } else if (!isLength(province, { max: 30 })) {
      return res
        .status(422)
        .send("Province should be maximum 30 characters long");
    } else if (!isLength(phone, { max: 65 })) {
      return res.status(422).send("Phone should be maximum 65 characters long");
    } else if (!isLength(postcode, { min: 4, max: 40 })) {
      return res.status(422).send("Postcode must be 4-40 characters long");
    } else if (!getName(country)) {
      return res.status(422).send("Invalid country code");
    }
    if (id) {
      const addressObject = user.address.id(id);
      addressObject.country = country;
      addressObject.city = city;
      addressObject.postcode = postcode;
      addressObject.address = address;
      addressObject.addressOptional = addressOptional;
      addressObject.province = province;
      addressObject.phone = phone;
    } else {
      if (user.address.length > 4) {
        return res
          .status(422)
          .send("You've reached the limit of 5 addresses per account");
      } else {
        user.address.push({
          country,
          city,
          postcode,
          address,
          addressOptional,
          province,
          phone,
        });
      }
    }
    return user;
  } else {
    return user;
  }
}
