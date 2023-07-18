import express from "express";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

const router = express.Router();

//push
router.post("/", async (req, res) => {
    const newUser = new User(req.body);
    console.log(newUser)
    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//update
router.put("/:id", async (req, res)=>{
    
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    }catch(err){
        res.status(500).json(err)
    }
})

//get
router.get("/:id", async (req, res, next)=>{
    
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
      } catch (err) {
        next(err);
    }
})


export default router