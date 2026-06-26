import jwt from "jsonwebtoken";

const tokenGenerator = async (userId)=>{
    try{
        const token = await jwt.sign({userId}, process.env.TOKEN, { expiresIn: '7days' });
    }catch(err){
        console.log(err);
    }
}

export default tokenGenerator;