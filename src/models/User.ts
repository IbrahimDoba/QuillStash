import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    emailVerified: {
      type: Date,
    },
    password: {
      type: String,
      required: false,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: "Blooger",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
    ],
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    pronouns: {
      type: String,
    },
    work: {
      type: String,
    },
    github: {
      type: String,
    },
  },

  { timestamps: true }
);

const User = models.Users || mongoose.model("Users", userSchema);
export default User;
