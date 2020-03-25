import connectDb from "../../utils/connectDb";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import isLength from "validator/lib/isLength";
const { getName } = require("country-list");
connectDb();

export default async (req, res) => {
  switch (req.method) {
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

  async function handlePutRequest(req, res) {
    const {
      id,
      country = "",
      city = "",
      postcode = "",
      address = "",
      addressOptional = "",
      province = "",
      phone = ""
    } = req.body;

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
    } else if (!isLength(phone, { max: 50 })) {
      return res.status(422).send("Phone should be maximum 65 characters long");
    } else if (!isLength(postcode, { min: 4, max: 40 })) {
      return res.status(422).send("Postcode must be 4-160 characters long");
    } else if (!getName(country)) {
      return res.status(422).send("Invalid country code");
    }

    try {
      const { userId } = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      const user = await User.findOne({ _id: userId });
      if (user) {
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
              phone
            });
          }
        }

        await user.save();
        res.status(200).send("Address updated");
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
    }
  }

  async function handleDeleteRequest(req, res) {
    const { id } = req.body;
    if (!("authorization" in req.headers)) {
      return res.status(401).send("No authorization token");
    }
    try {
      const { userId } = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      const addresses = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { address: { _id: id } } },
        { new: true }
      );
      res.status(200).json(addresses);
    } catch (error) {
      console.error(error);
      res.status(403).send("Please login again");
    }
  }
};
