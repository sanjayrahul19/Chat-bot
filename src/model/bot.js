import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    keywords: [
      {
        type: String,
      },
    ],
    answer: {
      type: String,
    },
  },
  { versionKey: false }
);

export const Bot = mongoose.model("bot", questionSchema);
