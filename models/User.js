import { Schema, model } from "mongoose";

const UserModel = Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model("User", UserModel);
