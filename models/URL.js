import mongoose, { Schema, model } from "mongoose";
import { nanoid } from "nanoid";

const URL = new Schema({
  long: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    required: false,
    default: 0,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

export default model("URL", URL);
