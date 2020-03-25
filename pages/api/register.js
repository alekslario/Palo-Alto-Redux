import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import Cart from "../../models/Cart";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

connectDb();

export default async (req, res) => {
  const { name, surname, email, password } = req.body;
  try {
    // 1) Validate name / email / password
    if (!isLength(name, { min: 2, max: 40 })) {
      return res.status(422).send("Name must be 2-40 characters long");
    } else if (!isLength(surname, { min: 2, max: 40 })) {
      return res.status(422).send("Surname must be 2-40 characters long");
    } else if (!isLength(password, { min: 6, max: 60 })) {
      return res.status(422).send("Password must be 6-60 characters long");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be valid");
    }
    // 2) Check to see if the user already exists in the db
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }
    // 3) --if not, hash their password
    const hash = await bcrypt.hash(password, 10);
    // 4) create user
    const newUser = await new User({
      name,
      surname,
      email,
      password: hash
    }).save();
    console.log({ newUser });
    // 5) create cart for new user
    await new Cart({ user: newUser._id }).save();
    // 6) create token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    // 7) send back token
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up user. Please try again later");
  }
};
