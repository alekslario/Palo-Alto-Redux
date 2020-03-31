import jwt from "jsonwebtoken";
export default handler => async (req, res) => {
  console.log(req.headers, "req.headers");

  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  let user = null;
  try {
    user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again");
  }
  req.user = user;
  return handler(req, res);
};
