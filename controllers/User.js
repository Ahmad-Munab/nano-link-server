import asyncHandler from "express-async-handler";
import { hash, compare } from "bcrypt";

import User from "../models/User.js";

import generateJWT  from "../config/generateJWT.js";


const getUserData = asyncHandler( async(req, res) => {
  return res.status(200).json(req.user)
})

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Bad request, All fields required",
    });
  }

  const duplicate = await User.findOne({
    username: { $regex: new RegExp(username, "i") },
  }).exec();
  if (duplicate) {
    return res.status(400).json({
      message: `Name: ${duplicate.username} already exists`,
    });
  }

  const hashedPassword = await hash(password, 10);
  const user = new User({
    username,
    password: hashedPassword,
  });
  await user.save();

  if (user) {
    let jwt = generateJWT(user._id);
    res
      .status(201)
      .json({ message: `New user ${user.username} created`, user, jwt });
  } else {
    res.status(500).json({ message: "Failed to create user" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  console.log(`User ${req.body.username} is logging in`);
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Bad request, All fields required",
    });
  }

  const user = await User.findOne({
    username: { $regex: new RegExp(username, "i") },
  });
  if (user && (await compare(password, user.password))) {
    let jwt = generateJWT(user._id);
    res.status(200).json({
      user,
      message: "User logged in successfully",
      jwt,
    });
  } else {
    res.status(401).json({ message: "Invalid Userame or Password" });
  }
});

export default {
  registerUser,
  loginUser,
  getUserData
};
