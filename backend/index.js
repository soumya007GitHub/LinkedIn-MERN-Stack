import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.get("/", (req, res)=>{
    res.send("On homepage");
})

app.listen(port, ()=>{
    connectToDB();
    console.log(`Server started on port ${port}`);
})