import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import isLength from "validator/lib/isLength";

connectDb();

export default async (req, res) => {
  const { token, password } = req.body;
  try {
    // 1) Validate name / email / password
    if (!isLength(password, { min: 6, max: 60 })) {
      return res.status(422).send("Password must be 6-60 characters");
    }
    // 2) Check to see if the user already exists in the db
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user)
      return res
        .status(401)
        .send("Password reset link is invalid or has expired.");
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    // hash their new password
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    user.save();

    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.SENDGRID_TO_EMAIL}`,
        pass: `${process.env.GMAIL_PASSWORD}`
      }
    });
    const mailOptions = {
      from: `${process.env.SENDGRID_TO_EMAIL}`,
      to: `${user.email}`,
      subject: "Your password has been changed",
      text: `Hi ${user.name} ${user.surname}, Palo Alto Redux support team here. \n 
      This is a confirmation that the password for your account ${user.email} has just been changed. If any problem persist contact us immediately - suo@suo.com\n`
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("Your password has been updated.");
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Server error. Try again or contact our support via email.");
  }
};
