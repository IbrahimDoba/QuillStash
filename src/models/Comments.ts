import mongoose, { Schema, models } from "mongoose";

const CommentSchema = new Schema(
  {
    userInfo: {
      username: {
        type: String,
        required: true,
      },
      userImage: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      authorId: {
        type: String,
      },
      postId: {
        type: String,
      },
    },
    body: {
      type: String,
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Comment = models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
