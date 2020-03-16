import Post from "../../models/Post";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  const { skips = 0, id, tag } = req.query;
  let posts = [];
  try {
    if (id) {
      const post = await Post.findOne({ postId: id });
      posts.push(post);
    } else if (tag) {
      posts = await Post.find({ tags: [tag] })
        .sort({ _id: -1 })
        .skip(skips)
        .limit(10);
    } else {
      posts = await Post.find()
        .sort({ _id: -1 })
        .skip(skips)
        .limit(10);
    }
    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
  }
};
