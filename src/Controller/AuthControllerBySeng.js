const bcrypt = require('bcrypt');
// const express = require('express');
const User = require('../Model/User')
const AuthController = {
         login: async (req,res)=>{
        //         get from body
               const {
                     username,
                     email,
                     password,
                     address,
                     work,
                     profile_picture_path   
               } = req.body;   

        //       create hidden pw or Encrypt PW
               const salt = await bcrypt.genSalt();
               const hashPassword = await bcrypt.hash(password,salt); 
               const newUser = new User({
                        username,
                        email,
                        password:hashPassword,
                        address,
                        work,
                        profile_picture_path
                });
               try{
                        
                        await newUser.save();
                        return res.json(newUser);
                        
               }catch(error){
                        console.log(error);
               }
       
        },
        getall : async(req,res)=>{
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
        updateUser: async (req,res)=>{
                if(!req.body){
                        return res.status(400).send({
                                message: "data to update can not be Empty!"
                        });
                }
                const id = req.params.id;

                await User.findByIdAndUpdate({_id:req.params.id},req.body,{useFindAndModify: false});
                const userUPdate = await User.findById(req.params.id);
                res.json(userUPdate);

                // //*------------------IT IS WORK TOO
                // User.findByIdAndUpdate(id,req.body,{useFindAndModify: false}).then((data)=>{
                //         if(!data){
                //                 res.status(404).send({
                //                         message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                //                       });
                //         }else res.send({Message: "Update Data Success  😜 "})
                        
                        
                // }).catch(err=>{
                //         res.status(500).send({message: "Error updating Tutorial with id=" + id});
                // });

                
        }
}

module.exports = AuthController;