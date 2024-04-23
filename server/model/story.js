import mongoose from "mongoose";
const { Schema } = mongoose;

const storySchema = new Schema(
  {
    owner: { type: String, required: true },
    stories: { type: Array, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);
const Story = mongoose.model("Story", storySchema);
export default Story;
