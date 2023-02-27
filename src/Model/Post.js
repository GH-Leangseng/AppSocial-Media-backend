const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
        desrciption:{
                type: String,
                default: '',
        },
        image_path:{
                type:String,
                default:'', 
                require :true
        },
        like:{
        
                type : Array,
                default : []
        },
        user_id:{
                type: String,
                require : true,
        },
        username:{
                type: String,
                require :true
        },
        profile_picture_path: { 
                type : String,
                require : true
        }

},{timestamps:true})
module.exports  = mongoose.model('posts',PostSchema);