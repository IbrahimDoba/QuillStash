import mongoose, { Schema, models } from "mongoose";

const CommentSchema = new Schema(
  {
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      body: {
        type: String,
        required: true
      }
  },
  { timestamps: true }
);

const Comment = models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
