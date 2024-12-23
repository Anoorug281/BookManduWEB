import { request, response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

import auth from '../middleware/auth.js';

const userRouter = Router();

// Sign Up Route
userRouter.post('/sign-up', async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // Validate username length
    if (!username || username.length < 2) {
      return res.status(400).json({
        message: "Username length should be greater than 2",
        error: true,
        success: false,
      });
    }

    // Check if username already exists
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({
        message: "Username already exists",
        error: true,
        success: false,
      });
    }

    // Check if email already exists
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        message: "Email already exists",
        error: true,
        success: false,
      });
    }

    // Validate password length
    if (!password || password.length <= 5) {
      return res.status(400).json({
        message: "Password's length must be greater than 5",
        error: true,
        success: false,
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      address,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Signup successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
      error: true,
      success: false,
    });
  }
})

//login route
userRouter.post("/login",async(req,res)=>{
    try {
        const {username, password}= req.body

        const existingUser = await UserModel.findOne({username})
        if(!existingUser){
            res.status(400).json({message:"Invalid credentials"})
        }
        await bcrypt.compare(password,existingUser.password, (error,data)=>{
            if(data){
                const authClaims = [
                    {name:existingUser.username},
                    {role : existingUser.role}
                ]
                const token = jwt.sign({authClaims},"bookStore123",{
                    expiresIn: "30d"
                })
                res.status(200).json({
                    message : "Login successfully",
                    id:existingUser._id,
                     role: existingUser.role,
                    token: token})
            }else{
                res.status(400).json({message: "Invalid credentials"})
            }
        })
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({
          message: "An unexpected error occurred. Please try again later.",
          error: true,
          success: false,
        });
    }
})


//get-user-information
userRouter.get("/get-user-information",auth,async(req, res)=>{
    try {
        const { id } = req.headers
        console.log(id)
        const data = await UserModel.findById(id).select("-password")
        return res.status(200).json(data)
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
          message: "An unexpected error occurred. Please try again later.",
          error: true,
          success: false,
        });
    }
})
  
//update address
userRouter.put("/update-address",auth,async(req,res)=>{
    try {
        const {id}= req.headers
        const {address} = req.body
        await userSchema.findByIdAndUpdate(id, {address : address})
        return res.status(200).json({message : "Address updated successfully"})
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error:true,
            success:true
        })
    }
})

export default userRouter;
