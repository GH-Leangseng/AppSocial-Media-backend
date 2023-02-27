const bcrypt = require('bcrypt');
// const express = require('express');
const User = require('../Model/User')
const jwt = require('jsonwebtoken');
const AuthController = {
        register: async (req,res)=>{
              const {username,email,password,address,work,profile_picture_path } = req.body;   
              try{
                        const salt = await bcrypt.genSalt();
                        const hashPassword = await bcrypt.hash(password,salt);  //use for encrybt password
                        const newUser = new User({
                                username,
                                email,
                                password:hashPassword, 
                                // password,
                                address,
                                work,
                                profile_picture_path
                        });
                       await newUser.save();
                       return res.json(newUser);
                       
              }catch(error){
                       console.log(error.message);
              }
      
       },
       login:async(req,res)=>{
                const { email , password } = req.body;
                 // console.log(process.env.JWT_KEY);
                try {
                        const user = await User.findOne({email});
                        if(!user) return  res.status(401).json({Message: "Unauthentication "});
                        const compare = await bcrypt.compare(password , user.password );
                        if(!compare) return res.status(401).json({Message: "Password not incorrect 😢 "});
                        const token = getToken(user);
                        return res.status(200).json({
                                user,
                                token,
                                message: "login success"
                        })
                } catch (error) {
                        return res.status(400).json(error.message);
                } 

       },
       getall : async (req,res)=>{
               const alluser = await User.find();
               res.json(alluser);
       },
       getUserByid : async(req,res) =>{
               const getUserById = await User.findById(req.params.id);
               res.json(getUserById);
       },
       deleteUser:async (req,res)=>{
               await User.findByIdAndDelete(req.params.id).then((User)=>{
                       if(!User){
                               res.json({
                                       Message: "Error "
                               })
                       }else{
                               res.json({
                                       mes:"Delete Success ",
                                       success : true
                                       })

                       }
               })
       },
       checkAuth: async (req , res)=>{
                const id = req.user._id;
               try {
                        const user = await User.findById(id);
                        return res.status(200).json(user);
               } catch (error) {
                        return res.status(401).json({message : "Unauthenicaton "});
               }
       }        

}
module.exports = AuthController;

function getToken(user){
        return jwt.sign({
                data : user
        },process.env.JWT_KEY,{ expiresIn : '5h'});
}




