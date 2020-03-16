import mongoose from "mongoose";

const { String, Date, Array } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  comments: [
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      time: {
        type: Date,
        required: true
      }
    }
  ]
});

// prettier-ignore
export default mongoose.models.Post || mongoose.model("Post", PostSchema);
