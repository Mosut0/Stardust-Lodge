import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

const router = express.Router();

//push
router.post("/", async (req, res)=>{
    const newHotels = []
    req.body.hotels.forEach(element => {
        newHotels.push(new Hotel(element));
    });
    
    try{
        var savedHotel;
        newHotels.forEach(async newHotel => {
            savedHotel = await newHotel.save()
        });
        res.status(200).json(savedHotel);
    }catch(err){
        res.status(500).json(err)
    }
})

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