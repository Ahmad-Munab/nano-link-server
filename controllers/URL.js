import asyncHandler from "express-async-handler";
import URL from "../models/URL.js";

import { nanoid } from "nanoid";

export const getURLs = asyncHandler(async (req, res) => {
  const urls = await URL.find({ userId: req.user._id }).exec();
  res.json(urls);
});

export const createURL = asyncHandler(async (req, res) => {
  const { long } = req.body;

  if (!long) return res.status(401).json("'long' is required");

  const duplicate = await URL.findOne({ long }).exec()
  if (duplicate) {
    return res.status(201).json(duplicate)
  }

  let short = nanoid(4);
  let duplicateShort = await URL.findOne({ short });
  while (duplicateShort) {
    short = nanoid(4);
    duplicateShort = await URL.findOne({ short });
  }

  try {
    const url = await URL.create({
      long,
      short,
      userId: req.user._id,
    });

    return res.status(200).json(url);
  } catch (error) {
    res.status(500).json(error);
  }
});

export const redirectURL = asyncHandler(async (req, res) => {
  let url = await URL.findOne({ short: req.params.shortURL }).exec();

  if (!url) {
    res.status(404).send("URl not found");
  }

  await url.updateOne({
    clicks: url.clicks + 1,
  });

  res.status(301).redirect(url.long);
});
