import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  keywords: [
    {
      type: String,
    },
  ],
  answer: {
    type: String,
  },
});

export const Bot = mongoose.model("bot", questionSchema);
