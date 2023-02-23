const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
        email:{
                type : String,
                unique: true,
                require:true,
        },
        password:{
                type: String,
                require: true,
                
        },
        username:{
                type: String,
                require : true,
                min:3,
                max:10,
                unique: true
        },
        address:{
                type: String,
                require : true
        
        },
        work:{
                type:String,
                require: true,
        },
        profile_picture_path:{
                type:String,
                default:'',
        },
        profile_view:{
                type:Number,
                default: 0
        },
        impress:{
                type:Number,
                default:0,
        },
        social_media:{
                type: Array,
                default:[],
        },
        friends:{
                type:Array,
                default:[], 
        }
},{timestamps:true})
module.exports  = mongoose.model('USER',UserSchema);