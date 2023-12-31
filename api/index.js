import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"
import hotelsRoute from "./routes/hotels.js"
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import cors from "cors"

const app = express()
dotenv.config()

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.")
    } catch (error){
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected")
})

const corsOptions ={
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.static('client'));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Error from Handler"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
})

app.listen(process.env.PORT || 3000, ()=>{
    connect()
    console.log("Connected to backend.")
});
