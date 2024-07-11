import mongoose, { Schema, models } from "mongoose";

const PostSchema = new Schema(
  {
    // author: {
    //   type: String,
    //   required: true,
    // },

    slug: {
      type: String,
      // unique: true,
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    bodyImage: {
      type: String,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    body: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    bookmarks: {
      type: Number,
      default: 0,
    },

    tags: {
      type: [String],
    },
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
    },
  },
  { timestamps: true }
);

const Post = models.Post || mongoose.model("Post", PostSchema);
export default Post;
