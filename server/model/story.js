import mongoose from "mongoose";
const { Schema } = mongoose;

const storySchema = new Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    stories: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);
const Story = mongoose.model("Story", userSchema);
export default Story;
