import User from "../../models/User";
import connectDb from "../../utils/connectDb";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import resetEmail from "../../utils/resetEmail";
connectDb();

export default async (req, res) => {
  const { token, email } = req.body;
  if (!token) {
    res.status(422).send("You ain't that smart after all...robot.");
  }
  if (!email) {
    res.status(422).send("Can't reset without the email");
  }
  try {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RE_CAPTCHA_SECRET_KEY}&response=${token}`;
    const response = await axios.post(url);
    if (response.data?.success) {
      const user = await User.findOne({ email });
      if (!user) {
        res
          .status(422)
          .send(
            "The email address " +
              email +
              " is not associated with any account. Double-check your email address and try again."
          );
      } else {
        user.generatePasswordReset();
        await user.save();

        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: `${process.env.SENDGRID_TO_EMAIL}`,
            pass: `${process.env.GMAIL_PASSWORD}`,
          },
        });
        const mailOptions = {
          from: `${process.env.SENDGRID_TO_EMAIL}`,
          to: `${email}`,
          subject: "Link To Reset Password",
          html: resetEmail(
            baseUrl,
            `${baseUrl}/reset/${user.resetPasswordToken}`
          ),
        };

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.log(err);

            res
              .status(500)
              .send(
                "There was an error while sending your email...Please try again later."
              );
          } else {
            console.log(response);

            res
              .status(200)
              .send(`Your password reset email has been sent to ${email}.`);
          }
        });
      }
    } else {
      res.status(422).send("Your answer wasn't correct, please try again.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying the user. Please try again later.");
  }
};
// text:
// `Hi there! Palo Alto Redux (${baseUrl}) support here.\n\n` +
// "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
// "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
// `${baseUrl}/reset/${user.resetPasswordToken}\n\n` +
// "If you did not request this, please ignore this email and your password will remain unchanged.\n"
