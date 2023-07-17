import express from "express";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const newUser = new User({
        ...req.body,
        password: hash,
      });
  
      await newUser.save();
      res.status(200).send("User has been created.");
    } catch (err) {
      next(err);
    }
})

router.post("/login", async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username});
      if (!user) return next(createError(404, "User not found!"));
      const correctpassword = await User.findOne({ username: req.body.username, password: req.body.password });
      if (!correctpassword) return next(createError(404, "Incorrect Password!"));

  
      const { password, isAdmin, ...otherDetails } = user._doc;
      res
        .status(200)
        .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
      next(err);
    }
})

export default router