import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  country:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  photos:{
    type: [String],
  },
  desc:{
    type: String,
    required: true
  },
  rating:{
    type: Number,
    min: 0,
    max: 5
  },
  rooms:{
    type: Number,
  },
  cheapestPrice:{
    type: Number,
    required: true
  },
  reviews:{
    type: Array,
    required: true
  }
});

export default mongoose.model("Hotel", HotelSchema)