const sgMail = require("@sendgrid/mail");

export default async function (req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { name, email, message } = req.body;

  const content = {
    to: process.env.SENDGRID_TO_EMAIL,
    from: email,
    subject: `New Message From - ${email} ${name}`,
    text: message,
    html: `<p>${message}</p>`,
  };
  try {
    await sgMail.send(content);
    res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.log("ERROR", error);
    res.status(400).send("Message not sent.");
  }
}
