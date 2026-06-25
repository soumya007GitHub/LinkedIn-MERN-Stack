import mongoose from "mongoose";

const connectToDB = async ()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to mongo db");
    }
    catch(e){
        console.log(e);
    }
}

export default connectToDB;