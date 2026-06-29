const bcrypt = require("bcryptjs");

const hashedPassword = await bcrypt.hash(password,10);


const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async(req,res,next)=>{

    const token = req.header("Authorization")?.replace("Bearer ","");

    if(!token){
        return res.status(401).json({
            message:"Not Access"
        });
    }

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        next();

    }catch(error){

        res.status(401).json({
            message:"Invalid Token"
        });

    }

};