import connectDb from "../../utils/connectDb";
import Post from "../../models/Post";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

async function handleGetRequest(req, res) {
  const { skips = 0, id, tag } = req.query;
  let comments = [];
  try {
    if (id) {
      const post = await Post.findOne({ postId: id });
      comments.push(post);
    } else if (tag) {
      comments = await Post.find({ tags: [tag] })
        .sort({ _id: -1 })
        .skip(skips)
        .limit(10);
    } else {
      comments = await Post.find().sort({ _id: -1 }).skip(skips).limit(10);
    }
    res.status(200).json({ comments });
  } catch (error) {
    console.log(error);
  }
}

async function handlePostRequest(req, res) {
  const { name, email, message, id, tags = [] } = req.body;
  try {
    if (!name || !email || !message || !id) {
      return res.status(422).send("One or more fields are missing");
    } else if (!isLength(name, { min: 1, max: 45 })) {
      return res.status(422).send("Name must be 1-30 characters long");
    } else if (!isLength(id, { min: 1, max: 100 }) || tags.length > 15) {
      return res.status(422);
    } else if (!isLength(message, { min: 2, max: 300 })) {
      return res.status(422).send("Message must be 2-300 characters long");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be valid");
    }
    const comment = {
      name,
      email,
      message,
      time: Date.now(),
    };
    let post = await Post.findOne({ postId: id });
    if (post) {
      post.comments.push(comment);
      post.save();
    } else {
      post = await new Post({
        postId: id,
        tags,
        comments: [comment],
      }).save();
    }
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error in creating a comment");
  }
}
