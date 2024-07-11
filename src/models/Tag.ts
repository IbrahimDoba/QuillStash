import mongoose, { Schema, models } from "mongoose";

const TagSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const Tag = models.Tag || mongoose.model("Tag", TagSchema);
export default Tag;
